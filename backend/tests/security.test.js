import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';
import {statuses,priorities} from '../src/utils/constants.js';
test('Estados solicitados por la rúbrica',()=>assert.deepEqual(statuses,['NUEVO','ASIGNADO','EN_PROCESO','RESUELTO','CERRADO']));
test('Prioridades válidas',()=>assert.ok(priorities.includes('CRITICA')));
test('La lista de incidentes requiere login',async()=>{
 const server=app.listen(0);
 try{const r=await fetch(`http://127.0.0.1:${server.address().port}/api/incidents`);assert.equal(r.status,401)}
 finally{server.close()}
});
