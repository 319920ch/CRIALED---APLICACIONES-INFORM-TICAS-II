const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../utils/authMiddleware'); // Asegúrate de que la ruta sea correcta
const usuarioController = require('../controllersAndServices/usuarioController');
const { registroValidationRules, validate } = require('../utils/validaciones');

// Ruta para listar todos los usuarios
router.get('/list', usuarioController.getAllUsers); // Llama a la función getAllUsers del usuarioController

router.post('/', registroValidationRules(), validate, usuarioController.createUser);
// Ruta para crear un nuevo usuario
router.post('/', authMiddleware, usuarioController.createUser);

// Ruta para actualizar un usuario por ID
router.put('/:id', authMiddleware, usuarioController.updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/:id', authMiddleware, usuarioController.deleteUser);

module.exports = router;
