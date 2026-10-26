import {Router} from 'express';
import {pool} from '../db.js';
import {safe} from '../middleware/errors.js';
import {auth, roles} from '../middleware/auth.js';
import {statuses,priorities} from '../utils/constants.js';
const router=Router();
router.get('/',safe(async(req,res)=>{
  const {status,priority,category,technician,q}=req.query;
  const filters=[];const params=[];
  const add=(condition,value)=>{params.push(value);filters.push(condition.replace('?',`$${params.length}`));};
  if(status)add('i.status=?',status);
  if(priority)add('i.priority=?',priority);
  if(category)add('i.category_id=?',Number(category));
  if(technician)add('i.technician_id=?',Number(technician));
  if(q){params.push(`%${q}%`);filters.push(`(i.title ILIKE $${params.length} OR i.description ILIKE $${params.length})`);}
  if(req.user.role==='USER')add('i.reporter_id=?',req.user.id);
  const sql=`SELECT i.*,c.name AS category,u.name AS reporter,t.name AS technician
    FROM incidents i JOIN categories c ON c.id=i.category_id
    JOIN users u ON u.id=i.reporter_id LEFT JOIN users t ON t.id=i.technician_id
    ${filters.length?'WHERE '+filters.join(' AND '):''}
    ORDER BY i.created_at DESC LIMIT 200`;
  const {rows}=await pool.query(sql,params);res.json(rows);
}));
router.get('/:id',auth,safe(async(req,res)=>{const {rows}=await pool.query('SELECT i.*,c.name AS category,u.name AS reporter,t.name AS technician FROM incidents i JOIN categories c ON c.id=i.category_id JOIN users u ON u.id=i.reporter_id LEFT JOIN users t ON t.id=i.technician_id WHERE i.id=$1',[req.params.id]);if(!rows.length)return res.status(404).json({error:'No encontrado'});if(req.user.role==='USER'&&rows[0].reporter_id!==req.user.id)return res.status(403).json({error:'Acceso denegado'});const history=await pool.query('SELECT h.*,u.name AS author FROM incident_history h JOIN users u ON u.id=h.user_id WHERE h.incident_id=$1 ORDER BY h.created_at DESC',[req.params.id]);res.json({...rows[0],history:history.rows})}));
router.post('/',auth,safe(async(req,res)=>{const {title,description,category_id,priority='MEDIA'}=req.body;if(typeof title!=='string'||typeof description!=='string'||!title.trim()||!description.trim()||!Number.isInteger(Number(category_id))||!priorities.includes(priority))return res.status(400).json({error:'Datos inválidos'});const {rows}=await pool.query('INSERT INTO incidents(title,description,category_id,priority,reporter_id) VALUES($1,$2,$3,$4,$5) RETURNING *',[title.trim(),description.trim(),category_id,priority,req.user.id]);await pool.query('INSERT INTO incident_history(incident_id,user_id,action,detail) VALUES($1,$2,$3,$4)',[rows[0].id,req.user.id,'CREADO','Incidente registrado']);res.status(201).json(rows[0])}));
router.patch('/:id',auth,roles('ADMIN','TECH'),safe(async(req,res)=>{const {status,technician_id}=req.body;if(status&&!statuses.includes(status))return res.status(400).json({error:'Estado inválido'});if(status===undefined&&technician_id===undefined)return res.status(400).json({error:'Sin cambios'});const old=await pool.query('SELECT * FROM incidents WHERE id=$1',[req.params.id]);if(!old.rows.length)return res.status(404).json({error:'No encontrado'});if(req.user.role==='TECH'&&technician_id!==undefined)return res.status(403).json({error:'Solo administrador asigna técnicos'});if(req.user.role==='TECH'&&old.rows[0].technician_id!==req.user.id)return res.status(403).json({error:'Solo puedes actualizar tus asignaciones'});const {rows}=await pool.query('UPDATE incidents SET status=COALESCE($1,status),technician_id=CASE WHEN $2::boolean THEN $3 ELSE technician_id END,updated_at=NOW() WHERE id=$4 RETURNING *',[status||null,technician_id!==undefined,technician_id??null,req.params.id]);await pool.query('INSERT INTO incident_history(incident_id,user_id,action,detail) VALUES($1,$2,$3,$4)',[req.params.id,req.user.id,'ACTUALIZADO',`Estado: ${rows[0].status}; técnico: ${rows[0].technician_id??'sin asignar'}`]);res.json(rows[0])}));
router.post('/:id/comments',auth,safe(async(req,res)=>{const detail=String(req.body.detail||'').trim();if(!detail)return res.status(400).json({error:'Comentario vacío'});const found=await pool.query('SELECT reporter_id FROM incidents WHERE id=$1',[req.params.id]);if(!found.rows.length)return res.status(404).json({error:'No encontrado'});if(req.user.role==='USER'&&found.rows[0].reporter_id!==req.user.id)return res.status(403).json({error:'Acceso denegado'});const {rows}=await pool.query('INSERT INTO incident_history(incident_id,user_id,action,detail) VALUES($1,$2,$3,$4) RETURNING *',[req.params.id,req.user.id,'COMENTARIO',detail]);res.status(201).json(rows[0])}));
export default router;
