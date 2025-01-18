import { iAgendamento } from '@/models/iAgendamento';
import client from './sql-client';

class AgendamentoRepository {

    async cadastrarAgendamento(agendamento: iAgendamento){
        try {
            const query: string = 'insert into agendamento(horario, profissionalid, qrcode, status, clienteid) values($1, $2, $3, $4, $5)'

            const parametros = [agendamento.horario, agendamento.profissionalid, agendamento.qrcode, agendamento.statusservico.toString(), agendamento.clienteid]
            const resultado = await client.executarComandoSql<any>(query, parametros);
            
            return resultado[0]; 
        } catch (error) {
            console.error('Ocorreu um erro ao efetuar operacao no banco de dados.')
            throw new Error('Ocorreu um erro ao efetuar operacao no banco de dados.')
        }
  
    }
}

export default new AgendamentoRepository()