import client from './sql-client';

class ClienteRepository {
    async BuscarClientePorEmail (email: string){
        const query: string = 'select u.* from usuario u where u.email = $1';
        const parametros = [email] 
        const res = await client.excutarComandoSql<any>(query, parametros);
        return res
    }
}

export default new ClienteRepository();