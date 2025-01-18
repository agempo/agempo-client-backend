import { iAgendamento } from "@/models/iAgendamento";
import agendamentoService from "@/service/agendamentoService";
import { iAgendamentoRequest} from "@/types/iAgendamento";
import { erroGenerico } from "@/utils/errorResponse";
import {  Request, Response } from "express";
import { ZodError } from "zod";

class AgendamentoController{

    async agendarServico(_req: Request, _res: Response): Promise<any>{
        const agendamentoRequisicao: iAgendamentoRequest = _req.body;
        const clienteId = _req.usuario

        try {  
            const agendamento: iAgendamento = await agendamentoService.realizarAgendamentoService(Number(clienteId), agendamentoRequisicao);
            return _res.status(200).json(agendamento);
        } catch (error) {
            if (error instanceof ZodError) {
                return _res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors  
                });
            }

            console.error(error);
            return erroGenerico(_res)
        }
    }
}

export default new AgendamentoController();