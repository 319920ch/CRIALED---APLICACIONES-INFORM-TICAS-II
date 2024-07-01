const express = require('express');
const router = express.Router();
const { authMiddleware, checkRole } = require('../utils/authMiddleware');
const contratoController = require('../controllersAndServices/contratoController'); // Asegúrate de que la ruta es correcta

router.post('/',
    authMiddleware,
    checkRole([1, 2]), // Solo roles con id 1 o 2 pueden crear un contrato
    contratoController.createContrato
  );

// Ruta para obtener todos los contratos
router.get('/', contratoController.getContratos);

// Ruta para obtener un contrato por ID
router.get('/:id', contratoController.getContratoById);

// Ruta para actualizar un contrato por ID
router.put('/:id', contratoController.updateContrato);

// Ruta para eliminar un contrato por ID
router.delete('/:id', contratoController.deleteContrato);

module.exports = router;
