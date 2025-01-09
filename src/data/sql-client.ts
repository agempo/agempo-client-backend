import getConnection from 'config/configdb';
import logger from 'config/logger';

class postgresSQLHelper {
  async excutarComandoSql<Type>(comando: string, parametros?: any): Promise<Awaited<Type>> {
    const client = await getConnection();
    try {
      const res = await client.query(comando, parametros);
      return res.rows;
    } catch (erro) {
      logger.error(comando);
      logger.error(parametros);
      logger.error(erro);
      throw new Error('Ocorreu um erro ao executar o comando SQL');
    } finally {
      await client.end();
    }
  }


}
export default new postgresSQLHelper();
