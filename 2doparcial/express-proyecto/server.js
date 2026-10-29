require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Prueba de vida
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Registro de Asistencia - CECyT 9 funcionando correctamente' });
});

// Mini-servidor de las semanas 6-7 (lo consume la página /mini-servidor del front)
app.get('/saludo', (req, res) => {
    res.json({ mensaje: 'Hola, esto es una prueba en GET' });
});

app.post('/eco', (req, res) => {
    const { texto } = req.body || {};
    if (!texto) {
        return res.status(400).json({ error: 'El texto es obligatorio' });
    }
    res.status(201).json({ eco: texto });
});

// Rutas de la API
app.use('/api/talleres', require('./rutas/rutas_talleres'));
app.use('/api/asistencias', require('./rutas/rutas_asistencias'));
app.use('/api/usuarios', require('./rutas/rutas_usuarios'));
app.use('/api/alumnos', require('./rutas/rutas_alumnos'));

// Ruta que no existe
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// JSON mal escrito en el body (coma de más, comillas simples, etc.)
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
        return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}

module.exports = app;
