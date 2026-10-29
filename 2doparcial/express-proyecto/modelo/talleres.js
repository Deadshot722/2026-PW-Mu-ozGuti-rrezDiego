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

// Compara nombres sin importar mayúsculas, acentos ni espacios de más.
function normalizar(texto) {
    return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// Inscribe a un alumno en un taller, revisando que el taller exista, que el usuario exista,
// que el nombre coincida, que no esté lleno y que la boleta no esté ya inscrita. Lanza un error con .codigo para que el controlador responda.
async function registrarseEnUnTaller(tallerId, { nombre_alumno, boleta }) {
    const taller = await obtenerPorId(tallerId);
    if (!taller) throw Object.assign(new Error('Taller no encontrado'), { codigo: 'TALLER_NO_EXISTE' });

    // El alumno debe existir en la tabla usuarios y el nombre debe ser el registrado para esa boleta.
    const [usuarios] = await pool.query('SELECT nombre FROM usuarios WHERE boleta = ?', [boleta]);
    if (usuarios.length === 0) {
        throw Object.assign(new Error('No existe un usuario registrado con esa boleta'), { codigo: 'USUARIO_NO_EXISTE' });
    }
    if (normalizar(usuarios[0].nombre) !== normalizar(nombre_alumno)) {
        throw Object.assign(new Error('El nombre no coincide con el registrado para esa boleta'), { codigo: 'NOMBRE_NO_COINCIDE' });
    }

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
    return require('./asistencias').registrar({ taller_id: tallerId, nombre_alumno: usuarios[0].nombre, boleta });
}

module.exports = {
    listar,
    obtenerPorId,
    crear,
    listarPorBoleta,
    registrarseEnUnTaller,
    consultarPorTaller: obtenerPorId, // nombre que usa la plantilla de la clase
};
