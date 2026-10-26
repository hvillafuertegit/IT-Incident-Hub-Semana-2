import test from 'node:test';import assert from 'node:assert/strict';
import {app} from '../src/app.js';
test('GET /api/health responde correctamente',async()=>{const server=app.listen(0);try{const port=server.address().port;const response=await fetch(`http://127.0.0.1:${port}/api/health`);assert.equal(response.status,200);assert.equal((await response.json()).ok,true)}finally{server.close()}});
test('GET /api/auth/me exige autenticación',async()=>{const server=app.listen(0);try{const response=await fetch(`http://127.0.0.1:${server.address().port}/api/auth/me`);assert.equal(response.status,401)}finally{server.close()}});
