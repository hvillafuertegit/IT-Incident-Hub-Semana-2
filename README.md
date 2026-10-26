# IT Incident Hub

Sistema de incidentes de TI con React, Node.js/Express y PostgreSQL **local**, sin Docker.

## Requisitos
- Node.js 22 o compatible
- PostgreSQL instalado y servicio iniciado
- Git y npm

## 1. Crear la base de datos
Abrir **pgAdmin → Query Tool** conectado a la base `postgres` y ejecutar:

```sql
CREATE DATABASE it_incident_hub;
```

Seleccionar después la base `it_incident_hub`, abrir una nueva Query Tool y ejecutar completo `database/schema.sql`. Si la base ya existe, omitir `CREATE DATABASE`.

## 2. Backend
En PowerShell, dentro de la carpeta del proyecto:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Antes de iniciar, editar **`backend/.env`** y reemplazar `CAMBIA_TU_PASSWORD` por la contraseña de PostgreSQL, `JWT_SECRET` por un valor aleatorio de 32+ caracteres y `DEMO_PASSWORD` por una clave de prueba. Si la contraseña de PostgreSQL contiene caracteres especiales, codificarlos en la URL (`@` → `%40`, `#` → `%23`).

Abrir otra terminal, también dentro de `backend`:

```powershell
npm run seed
```

El endpoint de comprobación es `http://localhost:3001/api/health`.

## 3. Frontend
Abrir otra terminal PowerShell en la raíz:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Abrir `http://localhost:5173`. Usuario: `admin@demo.local`. Clave: la variable `DEMO_PASSWORD`. También hay cuentas `tecnico@demo.local` y `usuario@demo.local`.

## 4. Comprobaciones

```powershell
cd backend
npm run check
npm test
npm audit --omit=dev
cd ../frontend
npm run build
npm audit
```

## Estructura
- `frontend/src/`: interfaz React, componentes y servicios
- `backend/src/routes/`: login, incidentes, categorías, usuarios y dashboard
- `backend/src/middleware/`: autenticación, roles y errores
- `database/schema.sql`: persistencia
- `docs/`: backlog, arquitectura, branching, deuda técnica, seguridad, dependencias y release
- `.github/workflows/ci.yml`: validación GitHub Actions
- `.gitlab-ci.yml`: pruebas, seguridad, build, artefacto y verificación runner

## GitHub / GitLab
Publicar primero en GitHub desde la rama `main` estable. Preparar Issues del backlog y seis PR reales enlazados. En GitLab crear un proyecto vacío e incorporar el mismo historial Git mediante remoto adicional, sin publicar `.env`. Los pipelines de GitLab usarán runners compartidos; para acreditar el agente autohospedado instalar GitLab Runner en Windows, registrarlo con etiqueta `local-windows` y lanzar la pipeline con variable `RUN_SELF_HOSTED=true`. El runner local debe tener Node.js en PATH y shell configurada. Proteger las ramas y variables y registrar aprobación y evidencia de release. Los tres repositorios/entregas parciales solicitados por el docente deben crearse en la plataforma acordada.

**Nota:** este ZIP no crea Issues, PR, artefactos ni releases reales en tus cuentas. Deben realizarse en GitHub y GitLab.
