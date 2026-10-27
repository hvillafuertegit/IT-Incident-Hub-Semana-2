import { priorities } from './constants.js';

export function validateIncident({ title, description, category_id, priority = 'MEDIA' }) {
  if (typeof title !== 'string' || title.trim().length < 5 || title.trim().length > 180) {
    return 'El título debe contener entre 5 y 180 caracteres';
  }

  if (typeof description !== 'string' || description.trim().length < 10 || description.trim().length > 2000) {
    return 'La descripción debe contener entre 10 y 2000 caracteres';
  }

  if (!Number.isInteger(Number(category_id)) || Number(category_id) <= 0 || category_id === null || category_id === '') {
    return 'Seleccione una categoría válida';
  }

  if (!priorities.includes(priority)) {
    return 'Seleccione una prioridad válida';
  }

  return null;
}
