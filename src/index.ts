require('module-alias/register');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', __dirname);

import { createApp } from './app';
import CONFIG from './config';

export const app = createApp();

app.listen({ port: CONFIG.APP.PORT }, (): void => {
    process.stdout.write(`⚒️  Application Environment: ${CONFIG.APP.ENV}\n`);
    process.stdout.write(`⚒️  Backend Catalogo no ar http://localhost:${CONFIG.APP.PORT}/${CONFIG.APP.CONTEXTO}\n`)
    process.stdout.write(`⚒️  Contrato OpenAPI no ar http://localhost:${CONFIG.APP.PORT}/${CONFIG.APP.CONTEXTO}/swagger-ui.html\n`)
})