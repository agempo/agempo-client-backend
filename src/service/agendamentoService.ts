import agendamentoRepository from "@/data/agendamentoRepository";
import { iAgendamentoRequest  } from "@/types/iAgendamento"
import { z, ZodError } from "zod";
import QRCode from 'qrcode';
import { iAgendamento } from "@/models/iAgendamento";
import { createHash, randomBytes } from "crypto";
import clienteRepository from "@/data/clienteRepository";
import BusinessError from "@/error/BusinessError";
import NotFoundError from "@/error/NotFoundError";
import assinaturaRepository from "@/data/assinaturaRepository";
import agempoBusinessIntegration from "@/integration/agempoBusinessIntegration";
import { AxiosError } from "axios";
import logger from "@/config/logger";

export const agendamentoSchema = z.object({
    estabelecimentoId: z.number().positive("O ID do estabelecimento deve ser um número positivo."),
    servicoId: z.number().positive("O ID do serviço deve ser um número positivo."),
    horario: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            const date = new Date(arg);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return undefined;
    }, z.date({ invalid_type_error: "Data inválida." })),
    profissionalId: z.number().positive("O ID do profissional deve ser um número positivo.")
});


class AgendamentoService {

    realizarAgendamentoService = async (clienteId: number, agendamento: iAgendamentoRequest): Promise<iAgendamento> => {
        try {
            agendamentoSchema.parse(agendamento);

            const agendamentoCadastro: iAgendamento = {
                clienteid: clienteId,
                estabelecimentoid: agendamento.estabelecimentoId,
                horario: agendamento.horario,
                servicoid: agendamento.servicoId,
                profissionalid: agendamento.profissionalId,
                servicoRealizado: false,
                pagamentoRealizado: false 
            }

            const assinaturaCliente = await assinaturaRepository.buscarAssinaturaPorIdCliente(clienteId)
            const estabelecimento = await agempoBusinessIntegration.buscarEstabelecimentoPorId(agendamentoCadastro.estabelecimentoid);

            if(assinaturaCliente){
                logger.info("Cliente assinante")

                if(!assinaturaCliente.assinaturaativa){
                    throw new BusinessError("A assinatura do usuario esta inativa");
                }
                
                if(!estabelecimento){
                    throw new BusinessError("O estabelecimento selecionado esta indisponivel");
                }
                
                if(assinaturaCliente.planoid < estabelecimento.planoId){
                    throw new BusinessError("O plano do usuario não atende a esse estabelecimento");
                }

                agendamentoCadastro.pagamentoRealizado = true;
            }

            logger.info("Cliente nao assinante")

            if(!estabelecimento){
                throw new BusinessError("O estabelecimento selecionado esta indisponivel");
            }
            

            //método de pagamento

            const salt = randomBytes(16).toString('hex');
            const hashCode = createHash('sha256').update(`${agendamento}` + salt).digest('hex');
            agendamentoCadastro.hashCode = hashCode;

            const qrCode = await this.gerarQrCode(agendamento.estabelecimentoId, clienteId, agendamento.servicoId, agendamento.horario, hashCode.toString());
            agendamentoCadastro.qrcode = qrCode;

            await this.enviarAgendamentoSQS(agendamentoCadastro);
            await agendamentoRepository.cadastrarAgendamento(agendamentoCadastro);

            return agendamentoCadastro;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodError(error.errors); 
            }

            if(error instanceof AxiosError && AxiosError.ERR_BAD_REQUEST){
                throw new AxiosError("O estabelecimento selecionado esta indisponivel")
            }
             
            throw error
        }
    }


    listarAgendamentosService = async (clienteId: number) => {
        try {
            const cliente = await clienteRepository.buscarClientePorIdBD(clienteId);

            if(!cliente){
                throw new BusinessError("Usuario invalido.")
            }

            const agendamentos = await agendamentoRepository.listarAgendamentosClienteBD(clienteId);

            return agendamentos;
        } catch (error) {
            throw error;
        }
    } 

    
    buscarAgendamentoPorId = async (estabelecimentoId: number) => {
        try {
            const agendamento = await agendamentoRepository.buscarAgendamentoPorId(estabelecimentoId);
            
            if(!agendamento){
                throw new NotFoundError("Agendamento nao encontrado");
            }
            
            return agendamento;
        } catch (error) {
            throw error;
        }
    } 



    gerarQrCode = async (estabelecimentoId: number, clienteId: number, servicoId: number, horario: Date, hashCode: string) => {
        try {
            const dadosQrCode = {
                estabelecimentoId,
                clienteId,
                servicoId,
                horario: horario.toLocaleString(),
                hashCode
            };
    
            const jsonString = JSON.stringify(dadosQrCode);
            
            const qrCode = await QRCode.toDataURL(jsonString, {
                errorCorrectionLevel: 'H',
                margin: 1,
                color: {
                    dark: '#e4572e',
                    light: '#FFFFFF'
                }, 
            });

            return qrCode
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            throw new Error('Falha ao gerar QR Code');
        }
    }

    enviarAgendamentoSQS = async (agendamento: iAgendamento) => {
        try {
            logger.debug(agendamento)
            //TODO: enviar json para fila sqs
        } catch (error) {
            console.error('Erro ao enviar mensagem para fila', error);
            throw new Error('Falha ao enviar agendamento para o estabelecimento');
        }
    }



    
}

export default new AgendamentoService()