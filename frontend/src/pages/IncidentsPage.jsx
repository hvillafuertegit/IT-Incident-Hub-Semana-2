import React from 'react';
import { Plus, Search } from 'lucide-react';
import IncidentTable from '../components/IncidentTable.jsx';

const statuses = ['NUEVO', 'ASIGNADO', 'EN_PROCESO', 'RESUELTO', 'CERRADO'];
const priorities = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];

export default function IncidentsPage({
  page,
  setPage,
  search,
  setSearch,
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  techFilter,
  setTechFilter,
  users,
  categories,
  shown,
  openIncident,
}) {
  const technicians = users.filter(
    (user) => user.role === 'TECH' || user.role === 'ADMIN'
  );

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">Gestión</span>
          <h1>{page}</h1>
          <p>Consulta, filtra y revisa las solicitudes.</p>
        </div>
        <button className="primary" onClick={() => setPage('Nuevo incidente')}>
          <Plus size={17} /> Nuevo incidente
        </button>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={16} />
          <input
            placeholder="Buscar por título, categoría o ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="">Todos los estados</option>
          {statuses.map((status) => <option key={status}>{status}</option>)}
        </select>

        <select
          aria-label="Prioridad"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="">Todas las prioridades</option>
          {priorities.map((priority) => <option key={priority}>{priority}</option>)}
        </select>

        <select
          aria-label="Categoría"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <select
          aria-label="Técnico"
          value={techFilter}
          onChange={(event) => setTechFilter(event.target.value)}
        >
          <option value="">Todos los técnicos</option>
          {technicians.map((technician) => (
            <option key={technician.id} value={technician.id}>{technician.name}</option>
          ))}
        </select>
      </div>

      <IncidentTable rows={shown} open={openIncident} />
    </>
  );
}
