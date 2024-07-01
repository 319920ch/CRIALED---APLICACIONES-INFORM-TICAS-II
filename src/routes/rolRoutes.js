const express = require('express');
const router = express.Router();
const rolController = require('../controllersAndServices/rolController');
const { check, validationResult } = require('express-validator');

router.post('/create',
    [
      check('nombre_rol')
        .notEmpty().withMessage('El nombre del rol es obligatorio')
        .isString().withMessage('El nombre del rol debe ser una cadena de caracteres')
    ],
    rolController.createRol);
router.get('/list', rolController.getAllRoles);
router.get('/:id', rolController.getRolById);
router.put('/:id', rolController.updateRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;
