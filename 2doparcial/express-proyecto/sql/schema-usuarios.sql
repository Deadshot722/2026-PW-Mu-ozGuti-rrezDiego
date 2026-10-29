-- Tabla de usuarios. Ejecútala en MySQL Workbench o con:  mysql -u root -p < sql/schema-usuarios.sql
-- Los usuarios de ejemplo se crean con:  npm run seed   (así su contraseña queda cifrada con bcrypt)
CREATE DATABASE IF NOT EXISTS cecyt9 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cecyt9;

CREATE TABLE IF NOT EXISTS usuarios (
    id              INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(120) NOT NULL,
    correo          VARCHAR(150) NOT NULL,
    contrasena_hash VARCHAR(100) NOT NULL,
    boleta          VARCHAR(10)  NOT NULL,
    rol             ENUM('alumno', 'docente', 'admin') NOT NULL DEFAULT 'alumno',
    CONSTRAINT uq_usuarios_correo UNIQUE (correo),
    CONSTRAINT uq_usuarios_boleta UNIQUE (boleta)
);
