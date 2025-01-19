import { iAssinatura } from "@/models/iAssinatura";
import client from './sql-client';


class AssinaturaRepository {

    async realizarAssinatura(clienteId: Number, planoId: Number){
        try {
            const query: string = `insert into assinatura(clienteid, planoid, datarenovacao, assinaturaativa) 
                values($1, $2, $3, $4) 
                returning clienteid, planoid, datarenovacao, assinaturaativa`;

            const parametros = [clienteId, planoId, new Date().toISOString(), true];

            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado[0]
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }

    async buscarAssinaturaPorId(assinaturaid: number){
        try {
            const query: string = 'select a.assinaturaid, a.clienteid, a.planoid, a.datarenovacao, a.assinaturaativa from assinatura a where a.assinaturaid = $1';
            const parametros = [assinaturaid];
            
            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado[0]
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }

    async buscarAssinaturaPorIdCliente(clienteId: number): Promise<iAssinatura | undefined>{
        try {
            const query: string = 'select a.assinaturaid, a.clienteid, a.planoid, a.datarenovacao, a.assinaturaativa from assinatura a where a.clienteid = $1';
            const parametros = [clienteId];
            
            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado[0]
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }

    async consultarAssinaturaPorIdCliente(clienteId: number){
        try {
            const query: string = `select a.assinaturaid, c.nome, c.cpf, p.descricao as plano, p.preco, a.assinaturaativa, a.datarenovacao     
                from assinatura a
                inner join cliente c on a.clienteid = c.clienteid 
                inner join plano p on a.planoid = p.planoid 
                where c.clienteid = $1`;
            
            const parametros = [clienteId]    
            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado[0]
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }
}

export default new AssinaturaRepository()
