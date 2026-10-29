
git add 2doparcial/express-proyecto/.gitignore 2doparcial/express-proyecto/.env.example 2doparcial/express-proyecto/package.json
git commit -m "chore(backend): crea proyecto Express con dependencias y .env.example"

git add 2doparcial/express-proyecto/db-local.js 2doparcial/express-proyecto/validaciones.js
git commit -m "feat(backend): conexion a MySQL por variables de entorno y validaciones de correo, boleta y contrasena"

git add 2doparcial/express-proyecto/sql/schema-talleres.sql 2doparcial/express-proyecto/sql/schema-usuarios.sql 2doparcial/express-proyecto/sql/seed-usuarios.js
git commit -m "feat(backend): esquema SQL de talleres, asistencias y usuarios con datos de ejemplo"

git add 2doparcial/express-proyecto/modelo/talleres.js 2doparcial/express-proyecto/controlador/talleres_controlador.js
git commit -m "feat(backend): modelo y controlador de talleres (listar, ver con asistentes, crear)"

git add 2doparcial/express-proyecto/modelo/asistencias.js 2doparcial/express-proyecto/controlador/asistencias_controlador.js
git commit -m "feat(backend): modelo y controlador de asistencias (registrar y consultar lista por taller)"

git add 2doparcial/express-proyecto/modelo/usuarios.js 2doparcial/express-proyecto/controlador/usuarios_controlador.js
git commit -m "feat(backend): modelo y controlador de usuarios con CRUD, validaciones, bcrypt y errores 400/404/409"

git add 2doparcial/express-proyecto/rutas 2doparcial/express-proyecto/server.js
git commit -m "feat(backend): rutas de talleres, asistencias y usuarios y servidor Express en el puerto 3001"

git add 2doparcial/express-proyecto/postman
git commit -m "test(backend): coleccion de Postman con las 24 peticiones de la guia"

git add 2doparcial/mini-proyecto-next/package.json 2doparcial/mini-proyecto-next/.gitignore 2doparcial/mini-proyecto-next/next.config.js
git commit -m "chore(front): crea proyecto Next.js con proxy /api hacia el backend"

git add 2doparcial/mini-proyecto-next/lib 2doparcial/mini-proyecto-next/components/Menu.js 2doparcial/mini-proyecto-next/styles/home.css 2doparcial/mini-proyecto-next/pages/_app.js 2doparcial/mini-proyecto-next/pages/_document.js 2doparcial/mini-proyecto-next/pages/mini-servidor
git commit -m "feat(front): pedirJSON, formato de fechas, validaciones, menu y estilos globales"

git add 2doparcial/mini-proyecto-next/components/TarjetaTaller.js 2doparcial/mini-proyecto-next/styles/TarjetaTaller.module.css 2doparcial/mini-proyecto-next/styles/Talleres.module.css 2doparcial/mini-proyecto-next/pages/talleres/index.js
git commit -m "feat(front): pagina /talleres con tarjetas, buscador y estados de carga, error y vacio"

git add 2doparcial/mini-proyecto-next/pages/talleres/[id].js
git commit -m "feat(front): detalle de taller con barra de lugares, inscritos e inscripcion por POST"

git add 2doparcial/mini-proyecto-next/pages/perfil.js
git commit -m "feat(front): pagina /perfil por boleta con Promise.all y enlaces de inscripcion prellenados"

git add 2doparcial/mini-proyecto-next/pages/usuarios.js 2doparcial/mini-proyecto-next/pages/asistencias.js
git commit -m "feat(front): paginas /usuarios y /asistencias para ver todos los registros"

git add 2doparcial/mini-proyecto-next/pages/index.js 2doparcial/mini-proyecto-next/styles/Dashboard.module.css 2doparcial/README.md
git commit -m "docs: pagina de inicio con modulos y README del segundo parcial"
