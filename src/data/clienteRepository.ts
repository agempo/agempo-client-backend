import { iCliente } from '@/models/iCliente';
import client from './sql-client';

class ClienteRepository {

    async cadastrarClienteBD(cliente: iCliente): Promise<iCliente> {
        try {
            const query: string = `insert into cliente (nome, sobrenome, email, senha, cpf, dataNascimento, role, ativo) 
            values ($1, $2, $3, $4, $5, $6, $7, $8) 
            returning clienteid, nome, sobrenome, email, cpf, dataNascimento`;
            
            const parametros = [cliente.nome, cliente.sobrenome, cliente.email, cliente.senha, cliente.cpf, cliente.datanascimento, cliente.role, true];
            
            const resultado = await client.executarComandoSql<any>(query, parametros);
            
            return resultado[0]; 
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
        
    }
    
    async buscarClientePorIdBD(clienteId: Number): Promise<iCliente | undefined> {
        try {
            const query: string = 'select c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento, c.role from cliente c where c.clienteId = $1 and c.ativo = true'
            const parametros = [clienteId] 
            const res = await client.executarComandoSql<any>(query, parametros);
            return res[0]
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
    }
    

    async buscarClientePorEmailBD(email: string): Promise<iCliente | undefined>{
        try {
            const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.senha, c.cpf, c.datanascimento, c.role from cliente c where c.email = $1 and c.ativo = true';
            const parametros = [email] 
            const res = await client.executarComandoSql<any>(query, parametros);
            return res[0]
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }

    }

    async buscarClientePorCpfBD(cpf: string): Promise<iCliente | undefined>{
        try {
            const query: string = 'select c.clienteid, c.nome, c.sobrenome, c.senha, c.cpf, c.datanascimento, c.role from cliente c where c.cpf = $1 and c.ativo = true';
            const parametros = [cpf] 
            const res = await client.executarComandoSql<any>(query, parametros);
            return res[0]  
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }

    }


    async listarClientesBD(listarTodos: boolean): Promise<Array<iCliente>>{
        try {
            let query: string = 'select c.clienteid, c.nome, c.sobrenome, c.email, c.cpf, c.datanascimento, c.role, c.ativo from cliente c';
            
            if(!listarTodos){
                query = query.concat(' where c.ativo = true')
            }
            
            console.log(query)
            const res = await client.executarComandoSql<any>(query);
            return res;
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }

    }

    async alterarClienteBD(clienteId: Number, cliente: iCliente): Promise<void>{
        try {
            const query: string = `update cliente set 
                nome = $1, 
                sobrenome = $2, 
                email = $3, 
                senha = $4, 
                cpf = $5, 
                datanascimento = $6 
            where clienteid = $7`

            const parametros = [cliente.nome, cliente.sobrenome, cliente.email, cliente.senha, cliente.cpf, cliente.datanascimento, clienteId];
            await client.executarComandoSql<any>(query, parametros);
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
    }


    async deletarClienteBD(clienteId: Number){
        try {
            const query: string = 'update cliente set ativo = false where clienteid = $1'
            const parametros = [clienteId]

            await client.executarComandoSql<any>(query, parametros);
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
    }


}

export default new ClienteRepository();