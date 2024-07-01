const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Usuario = require('../models/usuariom');
const authController = require('../controllersAndServices/authController'); // Verifica esta ruta
const { registroValidationRules, validate } = require('../utils/validaciones'); // Importar las validaciones

router.post('/login', authController.login);
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid'); // Borra la cookie de sesión
    res.json({ message: 'Cierre de sesión exitoso' });
  });
});

router.post('/register', registroValidationRules(), validate, authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);

module.exports = router;
