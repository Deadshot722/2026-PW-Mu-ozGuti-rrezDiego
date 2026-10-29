const crypto = require('crypto');
const pool = require('../db-local');

const COLUMNAS = 'id, taller_id, nombre_alumno, boleta, fecha_registro';

// Registra a un alumno en un taller. Si el taller no existe, la llave foránea de MySQL
// rechaza el INSERT y se lanza un error (el controlador lo convierte en 500).
async function registrar({ taller_id, nombre_alumno, boleta }) {
    const id = crypto.randomUUID();
    await pool.query(
        'INSERT INTO asistencias (id, taller_id, nombre_alumno, boleta) VALUES (?, ?, ?, ?)',
        [id, taller_id, nombre_alumno, boleta]
    );
    const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM asistencias WHERE id = ?`, [id]);
    return filas[0];
}

// Lista de asistencias (inscritos) de un taller.
async function listarPorTaller(tallerId) {
    const [filas] = await pool.query(
        `SELECT ${COLUMNAS} FROM asistencias WHERE taller_id = ? ORDER BY fecha_registro, nombre_alumno`,
        [tallerId]
    );
    return filas;
}

// Todas las asistencias, con el nombre del taller (o solo las de un taller si se manda tallerId).
async function listarTodas(tallerId = null) {
    const filtro = tallerId ? 'WHERE a.taller_id = ?' : '';
    const [filas] = await pool.query(
        `SELECT a.id, a.taller_id, t.nombre AS taller_nombre, a.nombre_alumno, a.boleta, a.fecha_registro
         FROM asistencias a
         JOIN talleres t ON t.id = a.taller_id
         ${filtro}
         ORDER BY a.fecha_registro DESC, a.nombre_alumno`,
        tallerId ? [tallerId] : []
    );
    return filas;
}

module.exports = {
    registrar,
    listarPorTaller,
    listarTodas,
    registrarAsistenciaEnElTaller: registrar, // nombres que usa la plantilla de la clase
    consultarListaDeAsistencias: listarTodas,
};
