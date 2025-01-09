import { Request, Response } from "express";
import loginService from "service/loginService";
import { iLoginRequest } from "types/iLogin";

class LoginController {

    realizarLogin = async (_req: Request, _res: Response) => {
        const data: iLoginRequest = _req.body
        try {
            loginService.realizarLogin(data)            
        } catch (error) {
            if(error === LoginError){
                _res.status(401).json({message: 'Email ou senha inválidos'})
            }
        }
    }
}

export default new LoginController()