// Inserta los usuarios de ejemplo (contraseña de todos: Segura2026, guardada con bcrypt).
// Uso:  npm run seed      (antes ejecuta sql/schema-usuarios.sql)
const bcrypt = require('bcryptjs');
const pool = require('../db-local');

const usuarios = [
    { nombre: 'Admin Semilla',   correo: 'admin@cecyt9.ipn.mx',          boleta: '0000000000', rol: 'admin' },
    { nombre: 'Ana López',       correo: 'ana.lopez@alumno.ipn.mx',      boleta: '2026090001', rol: 'alumno' },
    { nombre: 'Luis Pérez',      correo: 'luis.perez@alumno.ipn.mx',     boleta: '2026090002', rol: 'alumno' },
    { nombre: 'María Hernández', correo: 'maria.hernandez@alumno.ipn.mx', boleta: '2026090003', rol: 'alumno' },
];

async function main() {
    const hash = await bcrypt.hash('Segura2026', 10);
    for (const u of usuarios) {
        await pool.query(
            'INSERT IGNORE INTO usuarios (nombre, correo, contrasena_hash, boleta, rol) VALUES (?, ?, ?, ?, ?)',
            [u.nombre, u.correo, hash, u.boleta, u.rol]
        );
    }
    console.log('Usuarios de ejemplo listos.');
    await pool.end();
}

main().catch((error) => {
    console.error('No se pudo ejecutar el seed:', error.message);
    process.exit(1);
});
