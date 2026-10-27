import test from 'node:test';
import assert from 'node:assert/strict';
import { validateIncident } from '../src/utils/incident-validation.js';

const valid = {
  title: 'Sin acceso a red',
  description: 'No tengo conexión a la red desde esta mañana',
  category_id: 1,
  priority: 'MEDIA'
};

test('acepta un incidente válido', () => {
  assert.equal(validateIncident(valid), null);
});

test('rechaza un título demasiado corto', () => {
  assert.match(validateIncident({ ...valid, title: 'Red' }), /título/);
});

test('rechaza títulos de más de 180 caracteres', () => {
  assert.match(validateIncident({ ...valid, title: 'X'.repeat(181) }), /título/);
});

test('rechaza descripciones de menos de 10 caracteres', () => {
  assert.match(validateIncident({ ...valid, description: 'Error' }), /descripción/);
});

test('rechaza categorías inválidas', () => {
  assert.match(validateIncident({ ...valid, category_id: 0 }), /categoría/);
});

test('rechaza prioridades no permitidas', () => {
  assert.match(validateIncident({ ...valid, priority: 'URGENTE' }), /prioridad/);
});
