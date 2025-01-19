import assinaturaRepository from "@/data/assinaturaRepository"
import clienteRepository from "@/data/clienteRepository";
import planoRepository from "@/data/planoRepository";
import BusinessError from "@/error/BusinessError";

class AssinaturaService {
    consultarAssinatura = async (clienteId:number) => {
        try {
            const cliente = await clienteRepository.buscarClientePorIdBD(clienteId);

            if(!cliente){
                throw new BusinessError("O usuario informado e invalido");
            }
                    
            const assinatura = assinaturaRepository.consultarAssinaturaPorIdCliente(clienteId);

            if(!assinatura){
                throw new BusinessError("O usuario nao possui uma assinatura na Agempo");
            }

            return assinatura;
        } catch (error) {
            throw error
        }
    }

    realizarAssinatura = async (clienteId: Number, planoId: Number) => {
        try {
            const cliente = await clienteRepository.buscarClientePorIdBD(clienteId);
            if(!cliente){
                throw new BusinessError("O usuario informado e invalido");
            }
               
            const plano = await planoRepository.buscarPlanoPorId(planoId);
            if(!plano){
                throw new BusinessError("O plano selecionado esta indisponivel")
            }

            //método de pagamento
            const assinatura = await assinaturaRepository.realizarAssinatura(clienteId, planoId);
            return assinatura;
        } catch (error) {
            throw error;
        }
    }

}

export default new AssinaturaService()