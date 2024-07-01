const express = require('express');
const router = express.Router();
const contratoController = require('../controllersAndServices/contratoController');
//const { authMiddleware, verifyRoleMiddleware } = require('../utils/authMiddleware');

router.post('/create', /*authMiddleware, verifyRoleMiddleware([1, 2]),*/ contratoController.createContrato);

// Ruta para obtener todos los contratos
router.get('/', contratoController.getContratos);

// Ruta para obtener un contrato por ID
router.get('/:id', contratoController.getContratoById);

// Ruta para actualizar un contrato por ID
router.put('/:id', contratoController.updateContrato);

// Ruta para eliminar un contrato por ID
router.delete('/:id', contratoController.deleteContrato);

module.exports = router;
