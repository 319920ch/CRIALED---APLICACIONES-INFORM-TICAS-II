const express = require('express');
const router = express.Router();
const asignacionController = require('../controllersAndServices/asignacionController');

// Ruta para crear una nueva asignación
router.post('/', asignacionController.createAsignacion);

// Ruta para obtener todas las asignaciones
router.get('/', asignacionController.getAsignaciones);

// Ruta para obtener una asignación por ID
router.get('/:id', asignacionController.getAsignacionById);

// Ruta para actualizar una asignación por ID
router.put('/:id', asignacionController.updateAsignacion);

// Ruta para eliminar una asignación por ID
router.delete('/:id', asignacionController.deleteAsignacion);

module.exports = router;
