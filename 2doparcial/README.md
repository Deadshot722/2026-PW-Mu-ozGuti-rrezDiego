# Segundo parcial - Registro de Asistencia CECyT 9

Proyecto de **Programación Web** (Diego Muñoz Gutiérrez). Tiene dos partes que se ejecutan por separado:

| Carpeta | Qué es | Puerto | Cómo se lanza |
|---|---|---|---|
| `express-proyecto/` | Backend (Express + MySQL): modelos, controladores y rutas de **Talleres**, **Asistencias** y **Usuarios** | 3001 | `npm start` |
| `mini-proyecto-next/` | Frontend (Next.js) que consume el backend | 3000 | `npm start` |
| `backend-memoria/` | Backend de práctica de la clase (mismas rutas, datos en memoria, sin MySQL). Está tal como lo entregó el profesor: no se modifica | 3001 | `npm start` |

> `express-proyecto` y `backend-memoria` usan el mismo puerto (3001): enciende **solo uno** a la vez.

## 1. Backend (`express-proyecto`)

1. Enciende MySQL y ejecuta, en este orden, los dos archivos de la carpeta `sql/` (MySQL Workbench o consola):
   `schema-talleres.sql` y `schema-usuarios.sql`.
2. Copia `.env.example` como `.env` y escribe tu contraseña de MySQL (`DB_PASSWORD`). El `.env` no se sube a GitHub.
3. Instala y arranca:

   ```
   cd 2doparcial/express-proyecto
   npm install
   npm run seed     (opcional: crea 4 usuarios de ejemplo; contraseña de todos: Segura2026)
   npm start
   ```

   Debe decir `Servidor escuchando en el puerto 3001`. Abre http://localhost:3001 para ver el mensaje de prueba de vida.

### Rutas

| Método | Ruta | Respuestas |
|---|---|---|
| GET | `/` | 200 |
| GET | `/api/talleres` | 200 |
| GET | `/api/talleres/:id` | 200 (con `asistentes`) · 404 |
| POST | `/api/talleres` | 201 · 400 |
| GET | `/api/talleres/:id/asistencias` | 200 |
| GET | `/api/asistencias` | 200 (todas, con el nombre del taller) |
| POST | `/api/asistencias` | 201 · 400 · 500 (taller inexistente: lo rechaza la llave foránea) |
| GET | `/api/asistencias?tallerId=...` | 200 (solo las de ese taller) |
| POST | `/api/talleres/:id/registrarse` | 201 · 400 · 404 · 409 (taller lleno o boleta ya inscrita) |
| GET | `/api/talleres/alumno?boleta=...` · `/api/alumnos/:boleta/talleres` | 200 · 400 (talleres de una boleta) |
| GET | `/saludo` · POST `/eco` | Mini-servidor de las semanas 6-7 |
| GET | `/api/usuarios` · `/api/usuarios/:id` | 200 · 404 |
| POST | `/api/usuarios` | 201 · 400 · 409 |
| PUT | `/api/usuarios/:id` | 200 · 400 · 404 · 409 |
| DELETE | `/api/usuarios/:id` | 204 · 404 |

Estructura: `modelo/` (consultas SQL), `controlador/` (validaciones y códigos HTTP), `rutas/` (qué ruta llama a qué controlador), `validaciones.js`, `db-local.js` (conexión) y `server.js`.

Notas de la guía: `POST /api/asistencias` **no** revisa si el taller está lleno ni si la boleta ya está inscrita (lo cuida el front); la ruta extra `/registrarse` sí lo revisa, y `contrasena_hash` nunca sale en las respuestas.

### Pruebas con Postman

Importa `postman/coleccion-cecyt9-diego.json` (Import → archivo). Trae las **24 peticiones** de la guía (prueba de vida, talleres, asistencias y usuarios) más una carpeta *Extras* con las rutas nuevas, la variable `baseUrl` y una prueba de código de estado en cada una. Ejecútalas en orden (o con *Run collection*), toma las capturas del reporte y exporta tu colección como `coleccion-<tu-boleta>.json`.

## 2. Frontend (`mini-proyecto-next`)

Con el backend encendido, en **otra** terminal:

```
cd 2doparcial/mini-proyecto-next
npm install
npm start
```

Abre http://localhost:3000. `next.config.js` reenvía todo lo que empieza con `/api/` al backend (puerto 3001), por eso el front pide `/api/talleres` y no `http://localhost:3001/api/talleres`. Si tu backend usa otro puerto, crea `.env.local` con `BACKEND_URL=http://localhost:PUERTO` (y `MINI_SERVIDOR_URL` si el mini-servidor está aparte). Para usar `backend-memoria` en vez de MySQL, enciéndelo en lugar de `express-proyecto`; solo faltarán las rutas extra (`/alumnos/perfil`).

| Página | Qué muestra |
|---|---|
| `/` | Inicio con los módulos |
| `/talleres` | Todos los talleres en tarjetas, con buscador |
| `/talleres/[id]` | Detalle, lugares ocupados, inscritos y formulario de inscripción |
| `/usuarios` | Todos los usuarios |
| `/asistencias` | Todas las asistencias (alumno, taller, fecha de registro) |
| `/perfil` | Datos por boleta, mis talleres y talleres con lugar |
| `/alumnos/perfil` | Mis inscripciones (usa `/api/alumnos/:boleta/talleres`; acepta `?boleta=`) |
| `/practica/[id]` | Ruta dinámica de la semana 6 |
| `/mini-servidor` | Consume `/saludo` y `/eco` del Express (proxy `/mini`) |
| `/mini-servidor/[id]` | Ruta dinámica de práctica |
