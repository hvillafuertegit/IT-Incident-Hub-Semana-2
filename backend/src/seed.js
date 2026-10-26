import 'dotenv/config';import bcrypt from 'bcryptjs';import {pool} from './db.js';
const password=process.env.DEMO_PASSWORD||'Demo12345!';
const users=[['Administrador','admin@demo.local','ADMIN'],['Técnico','tecnico@demo.local','TECH'],['Usuario','usuario@demo.local','USER']];
for(const [name,email,role] of users){await pool.query('INSERT INTO users(name,email,role,password_hash) VALUES($1,$2,$3,$4) ON CONFLICT(email) DO NOTHING',[name,email,role,await bcrypt.hash(password,10)])}
const {rows}=await pool.query('SELECT COUNT(*)::int AS total FROM incidents');
if(!rows[0].total){const u=await pool.query("SELECT id FROM users WHERE email='usuario@demo.local'");const c=await pool.query("SELECT id FROM categories WHERE name='Red'");await pool.query('INSERT INTO incidents(title,description,category_id,priority,reporter_id) VALUES($1,$2,$3,$4,$5)',['Sin conexión a red','El equipo no tiene acceso a internet',c.rows[0].id,'ALTA',u.rows[0].id])}
console.log('Datos de demostración listos');await pool.end();
