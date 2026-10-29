
git add .gitignore 2doparcial/mini-proyecto-next/jsconfig.json
git commit -m "chore: .gitignore en la raiz y jsconfig.json con el alias @/"

git add 2doparcial/mini-proyecto-next/styles/home.css
git commit -m "fix(front): el selector de botones era .button y no button, los botones salian sin estilo"

git add 2doparcial/backend-memoria
git commit -m "chore: agrega backend-memoria (backend de practica de la clase, datos en memoria)"

git add 2doparcial/express-proyecto/sql/schema-talleres.sql
git commit -m "fix(backend): datos de ejemplo de talleres iguales a los de backend-memoria"

git add 2doparcial/express-proyecto/modelo 2doparcial/express-proyecto/controlador 2doparcial/express-proyecto/rutas 2doparcial/express-proyecto/server.js
git commit -m "feat(backend): talleres por boleta, registrarse con 404/409, filtro ?tallerId y mini-servidor /saludo y /eco"

git add 2doparcial/express-proyecto/postman
git commit -m "test(backend): carpeta Extras en la coleccion de Postman con las rutas nuevas"

git add 2doparcial/mini-proyecto-next/next.config.js 2doparcial/mini-proyecto-next/pages/practica 2doparcial/mini-proyecto-next/pages/mini-servidor.js
git commit -m "feat(front): pagina /mini-servidor con proxy /mini, ruta dinamica /practica/[id]"

git add 2doparcial/mini-proyecto-next/pages/alumnos 2doparcial/mini-proyecto-next/components/Menu.js 2doparcial/mini-proyecto-next/pages/index.js
git commit -m "feat(front): pagina /alumnos/perfil (mis inscripciones) y enlaces nuevos en menu e inicio"

git add "2doparcial/mini-proyecto-next/pages/talleres/[id].js"
git commit -m "fix(front): el mensaje de exito aparece despues de recargar la lista de inscritos"

git add 2doparcial/README.md
git commit -m "docs: README con backend-memoria, rutas nuevas y paginas nuevas"
