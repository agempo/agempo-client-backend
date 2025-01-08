import YAML from 'yaml';
import fs from 'fs';

const file = fs.readFileSync('./openapi/api.yaml', 'utf-8')
const swaggerDocument = YAML.parse(file)

export function configuraSwagger(url: string){
    try {
        swaggerDocument.servers[0].url = url
    }catch(Exception){

    }

    return swaggerDocument
}