import test from 'node:test';
import assert from 'node:assert/strict';
import { statuses, priorities } from '../src/utils/constants.js';

test('cinco estados de incidentes', () => { assert.deepEqual(statuses, ['NUEVO','ASIGNADO','EN_PROCESO','RESUELTO','CERRADO']); });
test('prioridad crítica disponible', () => assert.ok(priorities.includes('CRITICA')));
