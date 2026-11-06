require('dotenv').config();
const { Pool, types } = require('pg');
types.setTypeParser(1082, value => value);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.on('error', error => console.error('Unexpected idle PostgreSQL client error:', error.message));
module.exports = { pool, query: (text, values) => pool.query(text, values) };
