require('dotenv').config(); // ganz oben einfügen
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Verbindungsfehler zur Datenbank:', err.stack);
  }
  console.log('PostgreSQL-Datenbank verbunden!');
  release();
});

module.exports = pool;
