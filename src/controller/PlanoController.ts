import planoService from "@/service/planoService";
import { erroGenerico } from "@/utils/errorResponse";
import { Request, Response } from "express";

class PlanoController{

    async listarPlanos(_req: Request, _res: Response): Promise<any>{
        try{
            const planos = await planoService.listarPlanosService()
            return _res.status(200).json(planos);
        }catch(error){
            return erroGenerico(_res);
        }
    }
}

export default new PlanoController()