# Arquitectura
React (localhost:5173) consume la API REST Express (localhost:3001/api). Express se conecta a PostgreSQL local (localhost:5432) mediante `pg` y consultas parametrizadas. Autenticación JWT y contraseñas con bcrypt.

- `frontend/src/main.jsx`: vistas y flujos principales.
- `frontend/src/components`: elementos reutilizables.
- `frontend/src/services`: URL de API y cliente HTTP.
- `backend/src/app.js`: rutas y middleware.
- `backend/src/routes`: operaciones de cada módulo.
- `backend/src/middleware`: autenticación y errores.
- `database/schema.sql`: tablas e integridad referencial.

Para agregar un estado se actualizan `backend/src/utils/constants.js`, la restricción SQL del campo `status`, los selectores React y sus pruebas.
