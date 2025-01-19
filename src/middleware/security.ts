import { ROLES } from '@/types/iRoles';
import CONFIG from 'config';
import logger from 'config/logger';
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const urlBase: string = `/${CONFIG.APP.CONTEXTO}/api/v1`

declare global {
    namespace Express {
      interface Request {
        usuario: number;  
      }
    }
  }
  

export const validarToken: any = (_req: any, _res: any, _next: NextFunction) => {   
    const rotaLiberada: boolean =  _req.path === `${urlBase}/login` || (_req.path === `${urlBase}/cliente` && _req.method === 'POST') ||  (_req.path === `${urlBase}/planos` && _req.method === 'GET'); 
    
    if (rotaLiberada) {
        logger.debug("Rota liberada");
        return _next();
    }
    
    logger.debug(`Validando token JWT`)

    const token = _req.headers.authorization
    if(!token){
        return _res.status(401).json({ message: "Token Ausente" })
    } 

    try {
        jwt.verify(token, CONFIG.AUTH.PRIVATE_KEY)
    } catch (error) {
        logger.error(`Erro ao validar token JWT ${jwt}`)
        return _res.status(403).json({ error: 'Erro ao verificar o token' })
    }

        
    const { clienteId } = jwt.verify(token, CONFIG.AUTH.PRIVATE_KEY) as { clienteId: number };
    _req.usuario = clienteId;

    logger.debug(`JWT validado com sucesso`)
    return _next()
}


export const validarAdmin = (_req: Request, _res: Response, _next: NextFunction): void => {
    const token = _req.headers.authorization;

    if (!token) {
        _res.status(401).json({ message: "Token Ausente" });
        return; 
    }

    try {
        const decoded = jwt.verify(token, CONFIG.AUTH.PRIVATE_KEY) as { role: string };
        
        const role = decoded.role;

        if (role !== ROLES.ADMIN) {
            _res.status(403).json({ error: 'Acesso negado. Requer permissão de administrador.' });
            return; 
        }

        logger.debug("Usuario com permissao de administrador")
        _next(); 
    } catch (error) {
        _res.status(403).json({ error: 'Erro ao verificar o token ou token inválido.' });
    }
};