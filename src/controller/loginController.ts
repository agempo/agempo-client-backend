import LoginError from "@/error/LoginError";
import { iLoginRequest } from "@/types/iLogin";
import { Request, Response } from "express";
import loginService from "service/loginService";

class LoginController {

    async realizarLogin (req: Request, res: Response): Promise<any> {
        const data: iLoginRequest = req.body;
        try {
            const token = await loginService.realizarLogin(data);
            return res.status(200).json({ token });
        } catch (error) {
            if (error instanceof LoginError) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }
    
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default new LoginController()