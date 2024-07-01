const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllersAndServices/presupuestoController'); // Asegúrate de que la ruta es correcta

// Ruta para crear un nuevo presupuesto
router.post('/', presupuestoController.createPresupuesto);

// Ruta para obtener todos los presupuestos
router.get('/', presupuestoController.getPresupuestos);

// Ruta para obtener un presupuesto por ID
router.get('/:id', presupuestoController.getPresupuestoById);

// Ruta para actualizar un presupuesto por ID
router.put('/:id', presupuestoController.updatePresupuesto);

// Ruta para eliminar un presupuesto por ID
router.delete('/:id', presupuestoController.deletePresupuesto);

module.exports = router;
