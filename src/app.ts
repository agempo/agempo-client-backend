import cors from 'cors';
import CONFIG from 'config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { configuraSwagger } from 'config/swagger';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from 'router/routes';
import cookieParser from 'cookie-parser';
import { validarToken } from 'middleware/security';

export const createApp = (): express.Application => {
    const contexto = CONFIG.APP.CONTEXTO as string;
    const app = express();
    
    app.use(cors({}));

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    
    
    const swaggerDocument = configuraSwagger(`/${contexto}/api/v1`);
    app.use(
        `/${contexto}/swagger-ui.html`,
        swaggerUI.serve,
        swaggerUI.setup(swaggerDocument)
    );
    app.use(
        helmet({
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            },
        })
    );

    app.use(validarToken)
    app.use(morgan("combined"))
    app.use(`/${contexto}/api/v1`, routes);

    return app;
}