const express = require('express');
const router = express.Router();
const asistenciasControlador = require('../controlador/asistencias_controlador');

router.get('/', asistenciasControlador.obtenerAsistencias);
router.post('/', asistenciasControlador.registrarAsistencia);

module.exports = router;
