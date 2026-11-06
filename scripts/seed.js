require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../server/db');
(async () => {
 const password = process.env.ADMIN_PASSWORD;
 if (!process.env.ADMIN_EMAIL || !password || password.length < 12) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters)');
 const hash = await bcrypt.hash(password, 12);
 await pool.query("INSERT INTO users(name,email,password_hash,role) VALUES ($1,$2,$3,'admin') ON CONFLICT (email) DO NOTHING", [process.env.ADMIN_NAME || 'School Administrator', process.env.ADMIN_EMAIL.toLowerCase(), hash]);
 await pool.query("INSERT INTO grade_bands(label,minimum) VALUES ('A',90),('B',75),('C',60),('D',40),('F',0) ON CONFLICT DO NOTHING");
 console.log('Administrator and default grade bands initialized');
})().catch(e=>{console.error(e.message);process.exitCode=1;}).finally(()=>pool.end());
