const express = require('express');
const router = express.Router();
const proyectoController = require('../controllersAndServices/proyectoController'); // Asegúrate de que la ruta es correcta

// Ruta para crear un nuevo proyecto
router.post('/', proyectoController.createProyecto);

// Ruta para obtener todos los proyectos
router.get('/', proyectoController.getProyectos);

// Ruta para obtener un proyecto por ID
router.get('/:id', proyectoController.getProyectoById);

// Ruta para actualizar un proyecto por ID
router.put('/:id', proyectoController.updateProyecto);

// Ruta para eliminar un proyecto por ID
router.delete('/:id', proyectoController.deleteProyecto);

module.exports = router;
