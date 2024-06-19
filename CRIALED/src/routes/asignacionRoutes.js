const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacionController');

// Rutas para las asignaciones
router.post('/', asignacionController.createAsignacion);
router.get('/', asignacionController.getAsignaciones);
router.get('/:id', asignacionController.getAsignacionById);
router.put('/:id', asignacionController.updateAsignacion);
router.delete('/:id', asignacionController.deleteAsignacion);

module.exports = router;
