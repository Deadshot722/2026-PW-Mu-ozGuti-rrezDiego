const pool = require('../db-local');

// Solo estas columnas salen del backend: NUNCA se devuelve contrasena_hash.
const COLUMNAS_PUBLICAS = 'id, nombre, correo, boleta, rol';

async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
    return filas;
}

async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios WHERE id = ?`, [id]);
    return filas[0];
}

async function crear({ nombre, correo, contrasenaHash, boleta, rol }) {
    const [info] = await pool.query(
        'INSERT INTO usuarios (nombre, correo, contrasena_hash, boleta, rol) VALUES (?, ?, ?, ?, ?)',
        [nombre, correo, contrasenaHash, boleta, rol || 'alumno']
    );
    return obtenerPorId(info.insertId);
}

// Solo actualiza los campos que vienen en la petición (nombre, correo, rol).
async function actualizar(id, { nombre, correo, rol }) {
    const actual = await obtenerPorId(id);
    if (!actual) return undefined;

    const cambios = Object.entries({ nombre, correo, rol }).filter(([, valor]) => valor !== undefined);
    if (cambios.length === 0) return actual;

    const columnas = cambios.map(([columna]) => `${columna} = ?`).join(', ');
    await pool.query(`UPDATE usuarios SET ${columnas} WHERE id = ?`, [...cambios.map(([, valor]) => valor), id]);
    return obtenerPorId(id);
}

async function eliminar(id) {
    const [info] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return info.affectedRows > 0;
}

// Para el login de la próxima semana: aquí sí se necesita el hash.
async function buscarPorCorreoConHash(correo) {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return filas[0];
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar, buscarPorCorreoConHash };
