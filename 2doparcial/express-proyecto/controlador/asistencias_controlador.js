const asistenciasModelo = require('../modelo/asistencias');

function errorInterno(res, error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}

// POST /api/asistencias
// Nota: esta semana el backend NO revisa si el taller está lleno ni si la boleta ya está inscrita.
// Si el taller no existe, MySQL rechaza el INSERT (llave foránea) y se responde 500.
async function registrarAsistencia(req, res) {
    try {
        const { taller_id, nombre_alumno, boleta } = req.body || {};

        if (!taller_id || !nombre_alumno || !boleta) {
            return res.status(400).json({ error: 'taller_id, nombre_alumno y boleta son obligatorios' });
        }

        const nueva = await asistenciasModelo.registrar({
            taller_id: String(taller_id),
            nombre_alumno: String(nombre_alumno).trim(),
            boleta: String(boleta).trim(),
        });
        res.status(201).json(nueva);
    } catch (error) {
        errorInterno(res, error);
    }
}

// GET /api/talleres/:id/asistencias
async function obtenerAsistenciasDeTaller(req, res) {
    try {
        res.json(await asistenciasModelo.listarPorTaller(req.params.id));
    } catch (error) {
        errorInterno(res, error);
    }
}

// GET /api/asistencias  (todas, con el nombre del taller). Opcional: /api/asistencias?tallerId=...
async function obtenerAsistencias(req, res) {
    try {
        res.json(await asistenciasModelo.listarTodas(req.query.tallerId || null));
    } catch (error) {
        errorInterno(res, error);
    }
}

module.exports = {
    registrarAsistencia,
    obtenerAsistenciasDeTaller,
    obtenerAsistencias,
    registrarAsistenciaEnElTaller: registrarAsistencia, // nombres que usa la plantilla de la clase
    consultarListaDeAsistencias: obtenerAsistencias,
};
