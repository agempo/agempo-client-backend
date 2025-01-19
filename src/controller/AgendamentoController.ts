import BusinessError from "@/error/BusinessError";
import NotFoundError from "@/error/NotFoundError";
import { iAgendamento } from "@/models/iAgendamento";
import agendamentoService from "@/service/agendamentoService";
import { iAgendamentoRequest} from "@/types/iAgendamento";
import { erroGenerico } from "@/utils/errorResponse";
import { AxiosError } from "axios";
import {  Request, Response } from "express";
import { ZodError } from "zod";

class AgendamentoController{

    async agendarServico(_req: Request, _res: Response): Promise<any>{
        const agendamentoRequisicao: iAgendamentoRequest = _req.body;
        const clienteId = _req.usuario;

        try {  
            const agendamento: iAgendamento = await agendamentoService.realizarAgendamentoService(Number(clienteId), agendamentoRequisicao);
            return _res.status(200).json({ message: 'Agendamento realizado com sucesso', data: agendamento });
        } catch (error) {
            if (error instanceof ZodError) {
                return _res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors  
                });
            }
            
            if (error instanceof BusinessError || error instanceof AxiosError) {
                return _res.status(400).json({ message: error.message });
            }

            console.error(error);
            return erroGenerico(_res)
        }
    }

    async listarAgendamentos(_req: Request, _res: Response): Promise<any>{
        const clienteId = _req.usuario;

        try {
            const agendamentos = await agendamentoService.listarAgendamentosService(Number(clienteId));
            return _res.status(200).json(agendamentos);
        } catch (error) {
            if(error instanceof BusinessError){
                return _res.status(400).json({ message: error.message })
            }
            
            console.error(error);
            return erroGenerico(_res)
        }
    }

    async buscarAgendamentoPorId(_req: Request, _res: Response): Promise<any>{
        const agendamentoId = _req.params.agendamentoId;

        try {
            const agendamento = await agendamentoService.buscarAgendamentoPorId(Number(agendamentoId));
            return _res.status(200).json(agendamento);
        } catch (error) {
            if(error instanceof NotFoundError){
                return _res.status(404).json({ message: error.message })
            }
            
            console.error(error);
            return erroGenerico(_res)
        }
    }
}

export default new AgendamentoController();