const express = require('express');
const router = express.Router();
const authController = require('../controllersAndServices/authController');
const { registroValidationRules, validate } = require('../utils/validaciones');

router.post('/login', authController.login);
router.post('/register', registroValidationRules(), validate, authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);

module.exports = router;
