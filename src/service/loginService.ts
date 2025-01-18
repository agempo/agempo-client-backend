import clienteRepository from "data/clienteRepository";
import { iLoginRequest } from "types/iLogin";
import jwt from 'jsonwebtoken';
import CONFIG from "config";
import bcrypt from 'bcryptjs';
import LoginError from "@/error/LoginError";
import { iCliente } from "@/models/iCliente";

class LoginService {

    realizarLoginService = async (data: iLoginRequest) => {
        const email: string = data.email;

        const cliente: iCliente| undefined = await clienteRepository.buscarClientePorEmailBD(email);


        if(!cliente){
            throw new LoginError("E-mail ou senha inválidos!")
        }

        if(!(await bcrypt.compare(data.senha, cliente.senha))){
            throw new LoginError("E-mail ou senha inválidos!")
        }

        const token = jwt.sign( 
            { 
                clienteId: Number(cliente.clienteid),
                role: String(cliente.role)
            },
            CONFIG.AUTH.PRIVATE_KEY,
            { expiresIn: '120m' }
        )

        return token;
    }
}

export default new LoginService()