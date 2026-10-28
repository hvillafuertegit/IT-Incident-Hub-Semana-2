import React from 'react';
import {
  LayoutDashboard,
  Ticket,
  Users,
  FolderOpen,
  LogOut,
  ClipboardList,
} from 'lucide-react';

const navigationIcons = {
  Inicio: LayoutDashboard,
  Incidentes: Ticket,
  'Mis asignaciones': ClipboardList,
  Usuarios: Users,
  Categorías: FolderOpen,
};

export default function Sidebar({
  tabs,
  page,
  user,
  setPage,
  setSelected,
  setError,
  logout,
}) {
  function navigate(destination) {
    setPage(destination);
    setSelected(null);
    setError('');
  }

  return (
    <aside>
      <div className="brand">
        <span className="mark small">IT</span>
        <strong>IT Incident Hub</strong>
      </div>

      <nav>
        {tabs.map((tab) => {
          const Icon = navigationIcons[tab];

          return (
            <button
              key={tab}
              className={page === tab ? 'active' : ''}
              onClick={() => navigate(tab)}
            >
              <Icon />
              {tab}
            </button>
          );
        })}
      </nav>

      <div className="aside-bottom">
        <span>
          {user?.name}
          <small>{user?.role}</small>
        </span>
        <button title="Cerrar sesión" onClick={logout}>
          <LogOut size={19} />
        </button>
      </div>
    </aside>
  );
}
