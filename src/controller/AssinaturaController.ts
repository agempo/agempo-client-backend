import BusinessError from "@/error/BusinessError";
import assinaturaService from "@/service/assinaturaService";
import { erroGenerico } from "@/utils/errorResponse";
import { Request, Response } from "express";

class AssinaturaController{

    async consultarAssinatura(_req: Request, _res: Response): Promise<any>{
        const clienteId = _req.usuario;

        try {
            const agendamento = await assinaturaService.consultarAssinatura(Number(clienteId));
            return _res.status(200).json(agendamento);
        } catch (error) {
            if(error instanceof BusinessError){
                return _res.status(400).json({ message: error.message })
            }
            
            console.error(error);
            return erroGenerico(_res)
        }
    }

    async realizarAssinatura(_req: Request, _res: Response): Promise<any>{
        const planoId = _req.body.planoId;
        const cliente = _req.usuario;
        
        try {
            const assinatura = await assinaturaService.realizarAssinatura(cliente, planoId)
            return _res.status(200).json(assinatura);
        } catch (error) {
            if(error instanceof BusinessError){
                return _res.status(400).json({ message: error.message })
            }
            
            console.error(error);
            return erroGenerico(_res)
        }
    }
}

export default new AssinaturaController();