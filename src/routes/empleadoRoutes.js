const express = require('express');
const router = express.Router();
const empleadoController = require('../controllersAndServices/empleadoController'); // Asegúrate de que la ruta es correcta

// Ruta para crear un nuevo empleado
router.post('/', empleadoController.createEmpleado);

// Ruta para obtener todos los empleados
router.get('/', empleadoController.getEmpleados);

// Ruta para obtener un empleado por ID
router.get('/:id', empleadoController.getEmpleadoById);

// Ruta para actualizar un empleado por ID
router.put('/:id', empleadoController.updateEmpleado);

// Ruta para eliminar un empleado por ID
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
