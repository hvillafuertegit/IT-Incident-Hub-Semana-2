import {Router} from 'express';
import {pool} from '../db.js';
import {safe} from '../middleware/errors.js';
import {auth, roles} from '../middleware/auth.js';
import bcrypt from 'bcryptjs';
const router=Router();
router.get('/',auth,roles('ADMIN','TECH'),safe(async(req,res)=>{const {rows}=await pool.query('SELECT id,name,email,role FROM users ORDER BY name');res.json(rows)}));
router.post('/',auth,roles('ADMIN'),safe(async(req,res)=>{const {name,email,password,role='USER'}=req.body;if(!name||!email||!password||password.length<8||!['ADMIN','TECH','USER'].includes(role))return res.status(400).json({error:'Datos inválidos; contraseña mínimo 8 caracteres'});const hash=await bcrypt.hash(password,10);try{const {rows}=await pool.query('INSERT INTO users(name,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role',[name,email,hash,role]);res.status(201).json(rows[0])}catch(e){if(e.code==='23505')return res.status(409).json({error:'Correo ya registrado'});throw e}}));
export default router;
