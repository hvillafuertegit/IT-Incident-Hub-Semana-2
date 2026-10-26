import jwt from 'jsonwebtoken';
export function auth(req,res,next){
  const token=(req.headers.authorization||'').replace(/^Bearer /,'');
  try{req.user=jwt.verify(token,process.env.JWT_SECRET);next()}
  catch{return res.status(401).json({error:'Inicia sesión'})}
}
export const roles=(...allowed)=>(req,res,next)=> allowed.includes(req.user.role)?next():res.status(403).json({error:'Acceso denegado'});
