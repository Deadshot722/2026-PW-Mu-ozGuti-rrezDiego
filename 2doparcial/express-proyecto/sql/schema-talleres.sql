-- Tablas de talleres y asistencias (con datos de ejemplo).
-- Ejecuta este archivo en MySQL Workbench o con:  mysql -u root -p < sql/schema-talleres.sql
CREATE DATABASE IF NOT EXISTS cecyt9 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cecyt9;

CREATE TABLE IF NOT EXISTS talleres (
    id         CHAR(36)     NOT NULL PRIMARY KEY,
    nombre     VARCHAR(150) NOT NULL,
    instructor VARCHAR(120) NULL,
    fecha      DATE         NOT NULL,
    cupo       INT          NOT NULL DEFAULT 30
);

CREATE TABLE IF NOT EXISTS asistencias (
    id             CHAR(36)     NOT NULL PRIMARY KEY,
    taller_id      CHAR(36)     NOT NULL,
    nombre_alumno  VARCHAR(120) NOT NULL,
    boleta         VARCHAR(10)  NOT NULL,
    fecha_registro DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_asistencias_taller FOREIGN KEY (taller_id) REFERENCES talleres(id)
);

-- Datos de ejemplo (los mismos que backend-memoria)
INSERT IGNORE INTO talleres (id, nombre, instructor, fecha, cupo) VALUES
 ('a1000000-0000-4000-8000-000000000001', 'Introducción a Python',    'Ing. María López',    '2026-10-26', 25),
 ('a1000000-0000-4000-8000-000000000002', 'Fundamentos de Redes',     'Ing. Carlos Ramírez', '2026-10-28', 30),
 ('a1000000-0000-4000-8000-000000000003', 'Diseño de Bases de Datos', 'Ing. Ana Torres',     '2026-11-04', 20),
 ('a1000000-0000-4000-8000-000000000004', 'Git y GitHub en equipo',   'Ing. Jorge Méndez',   '2026-11-06', 3),
 ('a1000000-0000-4000-8000-000000000005', 'Next.js desde cero',       NULL,                  '2026-11-11', 2);

INSERT IGNORE INTO asistencias (id, taller_id, nombre_alumno, boleta) VALUES
 ('b1000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'Ana López',         '2026090001'),
 ('b1000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'Alumno sin cuenta', '2026999999'),
 ('b1000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000004', 'Ana López',         '2026090001'),
 ('b1000000-0000-4000-8000-000000000004', 'a1000000-0000-4000-8000-000000000004', 'Luis Pérez',        '2026090002'),
 ('b1000000-0000-4000-8000-000000000005', 'a1000000-0000-4000-8000-000000000005', 'Luis Pérez',        '2026090002'),
 ('b1000000-0000-4000-8000-000000000006', 'a1000000-0000-4000-8000-000000000005', 'María Hernández',   '2026090003');
