const crypto = require('crypto');
const pool = require('../db-local');

// Lista de talleres (ordenados por fecha).
async function listar() {
    const [filas] = await pool.query(
        'SELECT id, nombre, instructor, fecha, cupo FROM talleres ORDER BY fecha, nombre'
    );
    return filas;
}

// Un taller con el número de alumnos registrados (campo "asistentes").
async function obtenerPorId(id) {
    const [filas] = await pool.query(
        `SELECT t.id, t.nombre, t.instructor, t.fecha, t.cupo,
                (SELECT COUNT(*) FROM asistencias a WHERE a.taller_id = t.id) AS asistentes
         FROM talleres t
         WHERE t.id = ?`,
        [id]
    );
    if (!filas[0]) return undefined;
    return { ...filas[0], asistentes: Number(filas[0].asistentes) };
}

async function crear({ nombre, instructor, fecha, cupo }) {
    const id = crypto.randomUUID();
    await pool.query(
        'INSERT INTO talleres (id, nombre, instructor, fecha, cupo) VALUES (?, ?, ?, ?, ?)',
        [id, nombre, instructor || null, fecha, cupo]
    );
    return obtenerPorId(id);
}

// Talleres en los que está inscrita una boleta (con el nombre y la fecha de su inscripción).
async function listarPorBoleta(boleta) {
    const [filas] = await pool.query(
        `SELECT t.id, t.nombre, t.instructor, t.fecha, t.cupo, a.nombre_alumno, a.fecha_registro
         FROM asistencias a
         JOIN talleres t ON t.id = a.taller_id
         WHERE a.boleta = ?
         ORDER BY t.fecha, t.nombre`,
        [boleta]
    );
    return filas;
}

// Inscribe a un alumno en un taller, ahora SÍ revisando que el taller exista, que no esté lleno
// y que la boleta no esté ya inscrita. Lanza un error con .codigo para que el controlador responda.
async function registrarseEnUnTaller(tallerId, { nombre_alumno, boleta }) {
    const taller = await obtenerPorId(tallerId);
    if (!taller) throw Object.assign(new Error('Taller no encontrado'), { codigo: 'TALLER_NO_EXISTE' });

    const [repetida] = await pool.query(
        'SELECT id FROM asistencias WHERE taller_id = ? AND boleta = ?',
        [tallerId, boleta]
    );
    if (repetida.length > 0) {
        throw Object.assign(new Error('Esa boleta ya está registrada en este taller'), { codigo: 'YA_REGISTRADO' });
    }
    if (taller.asistentes >= taller.cupo) {
        throw Object.assign(new Error('El taller ya no tiene lugares'), { codigo: 'TALLER_LLENO' });
    }
    return require('./asistencias').registrar({ taller_id: tallerId, nombre_alumno, boleta });
}

module.exports = {
    listar,
    obtenerPorId,
    crear,
    listarPorBoleta,
    registrarseEnUnTaller,
    consultarPorTaller: obtenerPorId, // nombre que usa la plantilla de la clase
};
