import agendamentoRepository from "@/data/agendamentoRepository";
import { iAgendamentoRequest, StatusEnum } from "@/types/iAgendamento"
import { z, ZodError } from "zod";
import QRCode from 'qrcode';
import { iAgendamento } from "@/models/iAgendamento";

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

            const qrCode = await this.gerarQrCode(clienteId, agendamento.servicoId, agendamento.horario);

            const agendamentoCadastro: iAgendamento = {
                clienteid: clienteId,
                estabelecimentoid: agendamento.estabelecimentoId,
                horario: new Date(agendamento.horario).toISOString(),
                servicoid: agendamento.servicoId,
                profissionalid: agendamento.profissionalId,
                qrcode: qrCode,
                statusservico: StatusEnum.pendente
            }


            await this.enviarAgendamentoSQS(agendamentoCadastro);

            await agendamentoRepository.cadastrarAgendamento(agendamentoCadastro);

            return agendamentoCadastro;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodError(error.errors); 
            }
             
            throw new Error('Erro desconhecido')
        }
    }

    gerarQrCode = async (clienteId: number, servicoId: number, horario: Date) => {
        try {
            const dadosQrCode = {
                clienteId,
                servicoId,
                horario: horario.toLocaleString()
            };
    
            const jsonString = JSON.stringify(dadosQrCode);

            const qrCodeDataURL = await QRCode.toDataURL(jsonString);

            return qrCodeDataURL;
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            throw new Error('Falha ao gerar QR Code');
        }
    }

    enviarAgendamentoSQS = async (agendamento: iAgendamento) => {
        try {
            console.log(agendamento)
            //TODO: enviar json para fila sqs
        } catch (error) {
            console.error('Erro ao enviar mensagem para fila', error);
            throw new Error('Falha ao enviar agendamento para o estabelecimento');
        }
    }
}

export default new AgendamentoService()