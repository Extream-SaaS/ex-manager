module.exports = {
  query,
};

const Pool = require("pg").Pool;

const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

const pool = new Pool({
  user: process.env.CLOUD_SQL_USERNAME,
  password: process.env.CLOUD_SQL_PASSWORD,
  database: process.env.CLOUD_SQL_DATABASE,
  host: `${dbSocketPath}/${process.env.CLOUD_SQL_INSTANCE}`
});

async function query(queryString) {
  const client = await pool.connect();

  const result = await client.query(queryString);
  client.release();
  return result;
}