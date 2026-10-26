export const safe = fn => (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
export function errorHandler(err,req,res,next){
  console.error(err);
  if(err.code==='23503'||err.code==='23514'||err.code==='22P02') return res.status(400).json({error:'Datos inválidos'});
  if(err.code==='23505') return res.status(409).json({error:'El registro ya existe'});
  res.status(500).json({error:'Error interno del servidor'});
}
