import { iCliente } from '@/models/iCliente';
import client from './sql-client';

class ClienteRepository {
    
    async cadastrarClienteBD(cliente: iCliente): Promise<iCliente> {
        const query: string = `insert into cliente (nome, sobrenome, email, senha, cpf, dataNascimento, role) 
                               values ($1, $2, $3, $4, $5, $6, $7) 
                               returning clienteid, nome, sobrenome, email, cpf, dataNascimento`;
    
        const parametros = [cliente.nome, cliente.sobrenome, cliente.email, cliente.senha, cliente.cpf, cliente.dataNascimento, cliente.role];
        
        const resultado = await client.executarComandoSql<any>(query, parametros);
        
        return resultado[0]; 
    }
    

    async buscarClientePorEmailBD(email: string): Promise<iCliente | undefined>{
        const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento, c.role from cliente c where c.email = $1';
        const parametros = [email] 
        const res = await client.executarComandoSql<any>(query, parametros);
        return res[0]
    }

    async buscarClientePorCpfBD(cpf: string): Promise<iCliente | undefined>{
        const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento, c.role from cliente c where c.cpf = $1';
        const parametros = [cpf] 
        const res = await client.executarComandoSql<any>(query, parametros);
        return res[0]
    }


    async listarClientesBD(): Promise<Array<iCliente>>{
        const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento, c.role from cliente c';
        const res = await client.executarComandoSql<any>(query);
        return res;
    }


}

export default new ClienteRepository();