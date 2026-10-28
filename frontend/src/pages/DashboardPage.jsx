import React from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import IncidentTable from '../components/IncidentTable.jsx';

export default function DashboardPage({
  incidents,
  summary,
  count,
  setPage,
  openIncident,
}) {
  const opened = count('NUEVO') + count('ASIGNADO') + count('EN_PROCESO');
  const critical = incidents.filter(
    (incident) => incident.priority === 'CRITICA' && incident.status !== 'CERRADO'
  ).length;

  const indicators = [
    { label: 'Incidentes registrados', value: incidents.length },
    { label: 'Abiertos', value: opened },
    { label: 'Críticos', value: critical },
    { label: 'Cerrados', value: count('CERRADO') },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <span className="eyebrow">Espacio de trabajo</span>
          <h1>Panel de soporte</h1>
          <p>Gestiona y da seguimiento a los incidentes del área de TI.</p>
        </div>
        <button className="primary" onClick={() => setPage('Nuevo incidente')}>
          <Plus size={17} /> Nuevo incidente
        </button>
      </div>

      <div className="summary-line">
        {indicators.map((indicator) => (
          <div key={indicator.label}>
            <strong>{indicator.value}</strong>
            <span>{indicator.label}</span>
          </div>
        ))}
      </div>

      <div className="section-head">
        <h2>Incidentes recientes</h2>
        <button className="link" onClick={() => setPage('Incidentes')}>
          Ver todos →
        </button>
      </div>

      <IncidentTable rows={incidents.slice(0, 7)} open={openIncident} />

      <div className="simple-bottom">
        <section className="panel">
          <h2>Por categoría</h2>
          {summary.categories.map((category) => (
            <div className="metric" key={category.name}>
              <span>{category.name}</span>
              <b>{category.count}</b>
            </div>
          ))}
        </section>

        <section className="panel">
          <h2>Por técnico</h2>
          {(summary.technicians || []).map((technician) => (
            <div className="metric" key={technician.name}>
              <span>{technician.name}</span>
              <b>{technician.count}</b>
            </div>
          ))}

          <h2>Acciones frecuentes</h2>
          <button className="action" onClick={() => setPage('Nuevo incidente')}>
            <Plus size={17} /> Registrar incidente
          </button>
          <button className="action" onClick={() => setPage('Mis asignaciones')}>
            <ClipboardList size={17} /> Mis asignaciones
          </button>
        </section>
      </div>
    </>
  );
}
