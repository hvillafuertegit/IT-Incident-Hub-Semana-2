import {Router} from 'express';
import {pool} from '../db.js';
import {safe} from '../middleware/errors.js';
import {auth, roles} from '../middleware/auth.js';
const router=Router();
router.get('/',auth,safe(async(req,res)=>{const {rows}=await pool.query('SELECT * FROM categories ORDER BY name');res.json(rows)}));
router.post('/',auth,roles('ADMIN'),safe(async(req,res)=>{const name=String(req.body.name||'').trim();if(!name)return res.status(400).json({error:'Nombre obligatorio'});const {rows}=await pool.query('INSERT INTO categories(name) VALUES($1) RETURNING *',[name]);res.status(201).json(rows[0])}));
export default router;
