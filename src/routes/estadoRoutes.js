const express = require('express');
const router = express.Router();
const estadoController = require('../controllersAndServices/estadoController'); // Asegúrate de que la ruta es correcta

// Ruta para crear un nuevo estado
router.post('/', estadoController.createEstado);

// Ruta para obtener todos los estados
router.get('/', estadoController.getEstados);

// Ruta para obtener un estado por ID
router.get('/:id', estadoController.getEstadoById);

// Ruta para actualizar un estado por ID
router.put('/:id', estadoController.updateEstado);

// Ruta para eliminar un estado por ID
router.delete('/:id', estadoController.deleteEstado);

module.exports = router;
