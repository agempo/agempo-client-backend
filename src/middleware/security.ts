import CONFIG from 'config';
import logger from 'config/logger';
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const urlBase: string = `/${CONFIG.APP.CONTEXTO}/api/v1`

export const validarToken: any = (_req: Request, _res: Response, _next: NextFunction) => {   
    const rotaLiberada: boolean =  _req.path === `${urlBase}/login` || (_req.path === `${urlBase}/cliente` && _req.method === 'POST')
    
    if (rotaLiberada) {
        logger.debug("Rota liberada");
        return _next();
    }
    
    logger.debug(`Validando token JWT`)

    const token = _req.headers['authorization']?.split(' ')[1];
    if(!token) return _res.status(401).json({ message: "Token Ausente" })

    try {
        jwt.verify(token, CONFIG.AUTH.PRIVATE_KEY)
    } catch (error) {
        logger.error(`Erro ao validar token JWT ${jwt}`)
        return _res.status(403).json({ error: 'Erro ao verificar o token' })
    }

    logger.debug(`JWT validado com sucesso`)
    return _next()
}


