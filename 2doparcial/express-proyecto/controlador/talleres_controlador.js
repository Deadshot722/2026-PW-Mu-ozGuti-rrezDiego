const talleresModelo = require('../modelo/talleres');
const { validarBoleta } = require('../validaciones');

function errorInterno(res, error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}

async function obtenerTalleres(req, res) {
    try {
        res.json(await talleresModelo.listar());
    } catch (error) {
        errorInterno(res, error);
    }
}

async function obtenerTaller(req, res) {
    try {
        const taller = await talleresModelo.obtenerPorId(req.params.id);
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        res.json(taller);
    } catch (error) {
        errorInterno(res, error);
    }
}

async function crearTaller(req, res) {
    try {
        const { nombre, instructor, fecha, cupo } = req.body || {};

        if (!nombre || !fecha) {
            return res.status(400).json({ error: 'nombre y fecha son obligatorios' });
        }
        if (typeof nombre !== 'string' || !nombre.trim()) {
            return res.status(400).json({ error: 'nombre y fecha son obligatorios' });
        }
        if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ error: 'La fecha debe tener formato AAAA-MM-DD' });
        }
        if (cupo !== undefined && (!Number.isInteger(cupo) || cupo < 1)) {
            return res.status(400).json({ error: 'El cupo debe ser un número entero mayor a 0' });
        }

        const nuevo = await talleresModelo.crear({
            nombre: nombre.trim(),
            instructor: typeof instructor === 'string' ? instructor.trim() : undefined,
            fecha,
            cupo: cupo === undefined ? 30 : cupo,
        });
        res.status(201).json(nuevo);
    } catch (error) {
        errorInterno(res, error);
    }
}

// GET /api/talleres/alumno?boleta=2026090001  (talleres en los que está inscrita esa boleta)
async function obtenerTalleresDeBoleta(req, res) {
    try {
        const boleta = String(req.params.boleta !== undefined ? req.params.boleta : req.query.boleta || '').trim();
        if (!validarBoleta(boleta)) {
            return res.status(400).json({ error: 'La boleta debe tener 10 dígitos' });
        }
        res.json(await talleresModelo.listarPorBoleta(boleta));
    } catch (error) {
        errorInterno(res, error);
    }
}

// POST /api/talleres/:id/registrarse  { nombre_alumno, boleta }
// A diferencia de POST /api/asistencias, esta ruta SÍ responde 404 (taller o usuario inexistente),
// 400 (nombre distinto al registrado) y 409 (taller lleno o boleta ya inscrita).
async function registrarseEnUnTaller(req, res) {
    try {
        const { nombre_alumno, boleta } = req.body || {};
        if (!nombre_alumno || !boleta) {
            return res.status(400).json({ error: 'nombre_alumno y boleta son obligatorios' });
        }
        if (!validarBoleta(String(boleta).trim())) {
            return res.status(400).json({ error: 'La boleta debe tener 10 dígitos' });
        }
        const registro = await talleresModelo.registrarseEnUnTaller(req.params.id, {
            nombre_alumno: String(nombre_alumno).trim(),
            boleta: String(boleta).trim(),
        });
        res.status(201).json(registro);
    } catch (error) {
        if (error.codigo === 'TALLER_NO_EXISTE' || error.codigo === 'USUARIO_NO_EXISTE') {
            return res.status(404).json({ error: error.message });
        }
        if (error.codigo === 'NOMBRE_NO_COINCIDE') return res.status(400).json({ error: error.message });
        if (error.codigo === 'YA_REGISTRADO' || error.codigo === 'TALLER_LLENO') {
            return res.status(409).json({ error: error.message });
        }
        errorInterno(res, error);
    }
}

module.exports = {
    obtenerTalleres,
    obtenerTaller,
    crearTaller,
    obtenerTalleresDeBoleta,
    registrarseEnUnTaller,
    consultarPorTaller: obtenerTaller, // nombre que usa la plantilla de la clase
};
