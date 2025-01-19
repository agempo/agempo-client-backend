import client from './sql-client';


class PlanoRepository{

    async listarPlanosBD() {
        try {
            const query: string = `select p.planoid, p.descricao, p.preco from plano p`;
                        
            const resultado = await client.executarComandoSql<any>(query);
            return resultado; 
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
        
    }

    async buscarPlanoPorId(planoId: Number){
        try {
            const query: string = `select p.planoid, p.descricao, p.preco from plano p where p.planoid = $1`;
            
            const resultado = await client.executarComandoSql<any>(query, [planoId]);
            return resultado; 
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
    }
}

export default new PlanoRepository();