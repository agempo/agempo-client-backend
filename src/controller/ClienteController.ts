import BusinessError from "@/error/BusinessError";
import { iCliente } from "@/models/iCliente";
import clienteService from "@/service/clienteService";
import { Request, Response } from "express";
import { ZodError } from "zod";

class ClienteController {

    async cadastrarCliente(req: Request, res: Response): Promise<any>{
        const cliente: iCliente = req.body
        cliente.cpf = cliente.cpf?.replace(/[^\d]/g, ''); 

        try{
            const clienteCadastrado = await clienteService.cadastrarClienteService(cliente);
            
            return res.status(201).json(clienteCadastrado);
        }catch(error){
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors  
                });
            }

            if (error instanceof BusinessError) {
                return res.status(409).json({
                    message: error.message  
                });
            }

            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async listarClientes(_req: Request, res: Response): Promise<any>{
        try {
            const listaClientes = await clienteService.listarClientesService();
            
            return res.status(200).json(listaClientes);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}

export default new ClienteController()