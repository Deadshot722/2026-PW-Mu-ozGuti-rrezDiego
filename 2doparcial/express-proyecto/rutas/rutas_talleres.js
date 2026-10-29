const express = require('express');
const router = express.Router();
const talleresControlador = require('../controlador/talleres_controlador');
const asistenciasControlador = require('../controlador/asistencias_controlador');

router.get('/', talleresControlador.obtenerTalleres);
router.post('/', talleresControlador.crearTaller);
// OJO: /alumno va antes de /:id, si no Express creería que "alumno" es el id de un taller.
router.get('/alumno', talleresControlador.obtenerTalleresDeBoleta);
router.get('/:id', talleresControlador.obtenerTaller);
router.get('/:id/asistencias', asistenciasControlador.obtenerAsistenciasDeTaller);
router.post('/:id/registrarse', talleresControlador.registrarseEnUnTaller);

module.exports = router;
