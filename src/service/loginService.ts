import clienteRepository from "data/clienteRepository";
import { iLoginRequest } from "types/iLogin";

class LoginService {
    realizarLogin = async (data: iLoginRequest) =>{
        const email = data.email;

        const cliente = clienteRepository.BuscarClientePorEmail(email);
    }
}

export default new LoginService()