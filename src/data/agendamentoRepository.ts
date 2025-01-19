import { iAgendamento } from '@/models/iAgendamento';
import client from './sql-client';

class AgendamentoRepository {

    async cadastrarAgendamento(agendamento: iAgendamento){
        try {
            const query: string = `insert into agendamento(estabelecimentoid, horario, profissionalid, servicoid, qrcode, servicorealizado, pagamentorealizado, clienteid, hashcode) 
                values($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

            const parametros = [
                agendamento.estabelecimentoid, 
                agendamento.horario, 
                agendamento.profissionalid, 
                agendamento.servicoid, 
                agendamento.qrcode, 
                agendamento.servicoRealizado, 
                agendamento.pagamentoRealizado, 
                agendamento.clienteid, 
                agendamento.hashCode
            ];

            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado[0]; 
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }

    async listarAgendamentosClienteBD(clienteId: number){
        try {
            const query: string = 'select a.agendamentoid, a.estabelecimentoid, a.horario, a.servicoid, a.profissionalid, a.qrcode, a.hashcode, a.servicorealizado, a.pagamentorealizado from agendamento a where a.clienteid = $1';
            
            const parametros = [clienteId];
            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado;
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }

    async buscarAgendamentoPorId(estabelecimentoIdId: number){
        try {
            const query: string = 'select a.clienteid, a.agendamentoid, a.estabelecimentoid, a.horario, a.servicoid, a.profissionalid, a.qrcode, a.hashcode, a.servicorealizado, a.pagamentorealizado from agendamento a where a.agendamentoid = $1';
            
            const parametros = [estabelecimentoIdId];
            const resultado = await client.executarComandoSql<any>(query, parametros);
            return resultado[0];
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.');
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.');
        }
    }
}

export default new AgendamentoRepository()