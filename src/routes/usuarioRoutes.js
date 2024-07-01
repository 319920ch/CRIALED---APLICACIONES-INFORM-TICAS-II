const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../utils/authMiddleware'); // Asegúrate de que la ruta sea correcta
const usuarioController = require('../controllersAndServices/usuarioController');

router.get('/', authMiddleware, usuarioController.getAllUsers);
router.post('/', authMiddleware, usuarioController.createUser);
router.put('/:id', authMiddleware, usuarioController.updateUser);
router.delete('/:id', authMiddleware, usuarioController.deleteUser);

module.exports = router;
