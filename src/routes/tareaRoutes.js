const express = require('express');
const router = express.Router();
const tareaController = require('../controllersAndServices/tareaController'); // Asegúrate de que la ruta es correcta

// Ruta para crear una nueva tarea
router.post('/', tareaController.createTarea);

// Ruta para obtener todas las tareas
router.get('/', tareaController.getTareas);

// Ruta para obtener una tarea por ID
router.get('/:id', tareaController.getTareaById);

// Ruta para actualizar una tarea por ID
router.put('/:id', tareaController.updateTarea);

// Ruta para eliminar una tarea por ID
router.delete('/:id', tareaController.deleteTarea);

module.exports = router;
