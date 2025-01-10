import clienteRepository from "@/data/clienteRepository";
import { iCliente } from "@/models/iCliente";
import { z, ZodError } from 'zod'
import bcrypt from 'bcryptjs';
import BusinessError from "@/error/BusinessError";
import { ROLES } from "@/types/iRoles";

const clienteSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    sobrenome: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
    dataNascimento: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
        return undefined; 
    }, z.date())
});

class ClienteService {
    
    cadastrarClienteService = async (cliente: iCliente) => {
        try {
            clienteSchema.parse(cliente);

            const verificaEmail = await clienteRepository.buscarClientePorEmailBD(cliente.email);
            if (verificaEmail) {
                throw new BusinessError("Esse e-mail já está em uso");  
            }

            
            const verificaCpf = await clienteRepository.buscarClientePorCpfBD(cliente.cpf);
            if (verificaCpf) {
                throw new BusinessError("Esse CPF já está em uso");  
            }


            const hashedPassword = await bcrypt.hash(cliente.senha, 10);
            cliente.senha = hashedPassword;
            cliente.role = ROLES.USER;
            
            const clienteBD = await clienteRepository.cadastrarClienteBD(cliente)
            return clienteBD;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodError(error.errors); 
            }

            throw error;        
        }
    }


    listarClientesService = async () => {
        try {
            const listaClientesBD = await clienteRepository.listarClientesBD();

            return listaClientesBD;
        } catch (error) {
            throw error;
        }
    }
}

export default new ClienteService();
