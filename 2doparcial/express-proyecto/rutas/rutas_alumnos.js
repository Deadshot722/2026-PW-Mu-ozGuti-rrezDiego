const express = require('express');
const router = express.Router();
const talleresControlador = require('../controlador/talleres_controlador');

// GET /api/alumnos/2026090001/talleres
router.get('/:boleta/talleres', talleresControlador.obtenerTalleresDeBoleta);

module.exports = router;
