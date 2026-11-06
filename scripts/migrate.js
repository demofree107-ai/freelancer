require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {pool} = require('../server/db');
(async () => { await pool.query(fs.readFileSync(path.join(__dirname, '../server/schema.sql'), 'utf8')); console.log('Database schema ready'); })().catch(e => {console.error(e); process.exitCode=1;}).finally(()=>pool.end());
