// routes/proyectoRoutes.js
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

// Rutas para los proyectos
router.post('/', proyectoController.createProyecto);
router.get('/', proyectoController.getProyectos);
router.get('/:id', proyectoController.getProyectoById);
router.put('/:id', proyectoController.updateProyecto);
router.delete('/:id', proyectoController.deleteProyecto);

// Nueva ruta para calcular las asignaciones de empleados
router.get('/:id/asignaciones', proyectoController.calcularAsignaciones);

module.exports = router;
