import BusinessError from "@/error/BusinessError";
import NotFoundError from "@/error/NotFoundError";
import { iCliente } from "@/models/iCliente";
import clienteService from "@/service/clienteService";
import { erroGenerico } from "@/utils/errorResponse";
import { Request, Response } from "express";
import { ZodError } from "zod";

class ClienteController {

    async cadastrarCliente(_req: Request, _res: Response): Promise<any>{
        const cliente: iCliente = _req.body

        try{
            const clienteCadastrado = await clienteService.cadastrarClienteService(cliente);
            
            return _res.status(201).json(clienteCadastrado);
        }catch(error){
            if (error instanceof ZodError) {
                return _res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors  
                });
            }

            if (error instanceof BusinessError) {
                return _res.status(409).json({
                    message: error.message  
                });
            }

            console.error(error);
            return erroGenerico(_res)
        }
    }

    async listarClientes(_req: Request, _res: Response): Promise<any>{
        const listarTodos: boolean = _req.query.listarTodos === 'true';

        try {
            const listaClientes = await clienteService.listarClientesService(listarTodos);
            
            return _res.status(200).json(listaClientes);
        } catch (error) {
            return erroGenerico(_res)
        }
    }

    async buscarClientePorId(_req: Request, _res: Response): Promise<any>{
        const clienteId = _req.params.clienteId;

        try {
            const cliente = await clienteService.buscarClientePeloIdService(Number(clienteId))
            return _res.status(200).json(cliente);
        } catch (error) {
            if(error instanceof NotFoundError){
                return _res.status(404).json({ error: error.message })
            }

            return erroGenerico(_res)
        }

    }

    async alterarCliente(_req: Request, _res: Response): Promise<any>{
        const clienteId = _req.params.clienteId;
        const cliente: iCliente = _req.body

        try {
            await clienteService.alterarClienteService(Number(clienteId), cliente);
            return _res.status(200).json(cliente);
        } catch (error) {
            if(error instanceof NotFoundError){
                return _res.status(404).json({ error: error.message })
            }

            if (error instanceof ZodError) {
                return _res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors  
                });
            }

            if (error instanceof BusinessError) {
                return _res.status(409).json({
                    message: error.message  
                });
            }

            console.error(error);
            return erroGenerico(_res)
        }
    }

    async deletarCliente(_req: Request, _res: Response): Promise<any>{
        const clienteId = _req.params.clienteId;

        try {
            await clienteService.deletarClienteService(Number(clienteId));
            return _res.status(204).json({message: 'Sucesso ao deletar cliente'})
        } catch (error) {
            if(error instanceof NotFoundError){
                return _res.status(404).json({ error: error.message })
            }

            console.error(error);
            return erroGenerico(_res)
        }
    }
}

export default new ClienteController()