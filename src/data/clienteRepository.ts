import { iCliente } from '@/models/iCliente';
import client from './sql-client';

class ClienteRepository {
    
    async cadastrarClienteBD(cliente: iCliente): Promise<iCliente> {
        const query: string = `insert into cliente (nome, sobrenome, email, senha, cpf, dataNascimento) 
                               values ($1, $2, $3, $4, $5, $6) 
                               returning clienteid, nome, sobrenome, email, cpf, dataNascimento`;
    
        const parametros = [cliente.nome, cliente.sobrenome, cliente.email, cliente.senha, cliente.cpf, cliente.dataNascimento];
        
        const resultado = await client.executarComandoSql<any>(query, parametros);
        
        return resultado[0]; 
    }
    

    async buscarClientePorEmailBD(email: string): Promise<iCliente | undefined>{
        const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento from cliente c where c.email = $1';
        const parametros = [email] 
        const res = await client.executarComandoSql<any>(query, parametros);
        return res[0]
    }

    async buscarClientePorCpfBD(cpf: string): Promise<iCliente | undefined>{
        const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento from cliente c where c.cpf = $1';
        const parametros = [cpf] 
        const res = await client.executarComandoSql<any>(query, parametros);
        return res[0]
    }


}

export default new ClienteRepository();