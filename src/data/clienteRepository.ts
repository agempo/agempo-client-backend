import { iCliente } from 'types/iCliente';
import client from './sql-client';

class ClienteRepository {
    async buscarClientePorEmail (email: string): Promise<iCliente | undefined>{
        const query: string = 'select u.* from usuario u where u.email = $1';
        const parametros = [email] 
        const res = await client.excutarComandoSql<any>(query, parametros);
        return res
    }
}

export default new ClienteRepository();