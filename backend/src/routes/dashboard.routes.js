import {Router} from 'express';
import {pool} from '../db.js';
import {safe} from '../middleware/errors.js';
import {auth, roles} from '../middleware/auth.js';
const router=Router();
router.get('/',auth,safe(async(req,res)=>{const where=req.user.role==='USER'?'WHERE reporter_id=$1':'';const args=req.user.role==='USER'?[req.user.id]:[];const {rows}=await pool.query(`SELECT status,COUNT(*)::int AS count FROM incidents ${where} GROUP BY status`,args);const {rows:categories}=await pool.query(`SELECT c.name,COUNT(i.id)::int AS count FROM categories c LEFT JOIN incidents i ON i.category_id=c.id ${req.user.role==='USER'?'AND i.reporter_id=$1':''} GROUP BY c.id ORDER BY count DESC`,args);const {rows:technicians}=await pool.query(`SELECT u.name, COUNT(i.id)::int AS count FROM users u LEFT JOIN incidents i ON i.technician_id=u.id ${req.user.role==='USER'?'AND i.reporter_id=$1':''} WHERE u.role IN ('TECH','ADMIN') GROUP BY u.id ORDER BY count DESC`,args);res.json({statuses:rows,categories,technicians})}));
export default router;
