import clienteRepository from "@/data/clienteRepository";
import { iCliente } from "@/models/iCliente";
import { z, ZodError } from 'zod'
import bcrypt from 'bcryptjs';
import BusinessError from "@/error/BusinessError";
import { ROLES } from "@/types/iRoles";
import NotFoundError from "@/error/NotFoundError";

const clienteSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    sobrenome: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
    dataNascimento: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
        return undefined; 
    }, z.date())
});

class ClienteService {

    buscarClientePeloIdService = async (clienteId: Number) => {
        try {
            const clienteBD = await clienteRepository.buscarClientePorIdBD(clienteId)

            if(!clienteBD){
                throw new NotFoundError("Cliente não encontrado")
            }

            return clienteBD;
        } catch (error) {
            throw error;
        }
    }
    
    cadastrarClienteService = async (cliente: iCliente) => {
        try {
            cliente.cpf = cliente.cpf?.replace(/[^\d]/g, ''); 

            clienteSchema.parse(cliente);

            const verificaEmail = await clienteRepository.buscarClientePorEmailBD(cliente.email);
            if (verificaEmail) {
                throw new BusinessError("Esse e-mail já está em uso");  
            }

            
            const verificaCpf = await clienteRepository.buscarClientePorCpfBD(cliente.cpf);
            if (verificaCpf) {
                throw new BusinessError("Esse CPF já está em uso");  
            }


            const hashedPassword = await bcrypt.hash(cliente.senha, 10);
            cliente.senha = hashedPassword;
            cliente.role = ROLES.USER;
            
            const clienteBD = await clienteRepository.cadastrarClienteBD(cliente)
            return clienteBD;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodError(error.errors); 
            }
            
            throw new Error('Erro desconhecido')
        }
    }


    listarClientesService = async (listarTodos: boolean) => {
        try {
            const listaClientesBD = await clienteRepository.listarClientesBD(listarTodos);

            return listaClientesBD;
        } catch (error) {
            throw error;
        }
    }

    alterarClienteService = async (clienteId: Number, cliente: iCliente) => {
        try {
            const clienteBD: iCliente | undefined = await clienteRepository.buscarClientePorIdBD(clienteId)
            
            if(!clienteBD){
                throw new NotFoundError("Cliente não encontrado")
            }
            
            cliente.cpf = cliente.cpf?.replace(/[^\d]/g, ''); 
            clienteSchema.parse(cliente);
            
            const verificaEmail = await clienteRepository.buscarClientePorEmailBD(cliente.email);
            if (verificaEmail) {
                throw new BusinessError("Esse e-mail já está em uso");  
            }
            
            
            const verificaCpf = await clienteRepository.buscarClientePorCpfBD(cliente.cpf);
            if (verificaCpf) {
                throw new BusinessError("Esse CPF já está em uso");  
            }

            await clienteRepository.alterarClienteBD(clienteId, cliente);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodError(error.errors); 
            }
            
            throw error;
        }
    }

    deletarClienteService = async (clienteId: Number) => {
        try {
            const clienteBD: iCliente | undefined = await clienteRepository.buscarClientePorIdBD(clienteId)
            
            if(!clienteBD){
                throw new NotFoundError("Cliente não encontrado")
            }

            await clienteRepository.deletarClienteBD(clienteId)
        } catch (error) {
            throw error;

        }
    }
}

export default new ClienteService();
