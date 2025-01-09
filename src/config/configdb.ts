import CONFIG from "config";

const { Pool } = require('pg');
const { types } = require('pg');


const credentials = {
  user: CONFIG.DATABASE.DB_USER,
  host: CONFIG.DATABASE.DB_HOST,
  database: CONFIG.DATABASE.DB_NAME,
  password: CONFIG.DATABASE.DATABASE_PASSWORD,
  port: CONFIG.DATABASE.DB_PORT,
};

async function getConnection() {
  types.setTypeParser(20, (val: string) => parseInt(val));
  const pool = new Pool(credentials);

  return pool;
}

export default getConnection;
