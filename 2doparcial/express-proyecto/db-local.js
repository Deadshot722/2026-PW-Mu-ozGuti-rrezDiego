// Conexión a MySQL. Los datos vienen del archivo .env (nunca escribas la contraseña aquí).
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cecyt9',
    dateStrings: true, // las fechas salen como '2026-11-20' y no como 2026-11-20T06:00:00.000Z
});

module.exports = pool;
