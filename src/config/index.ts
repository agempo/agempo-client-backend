import path from "path";
import pkg from '../../package.json';
import logger from './logger';

if(!process.env.NODE_ENV){
    logger.info(`Obtendo configuracoes do diretorio ${__dirname}`)
    require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
}

const CONFIG ={
    APP: {
        NAME: process.env.APP,
        VERSION: pkg.version,
        PORT: 80,
        ENV: process.env.NODE_ENV? process.env.NODE_ENV: 'LOCAL',
        CONTEXTO: process.env.APP
    },
}

export default CONFIG;