const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  check('correo_electronico').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('contrasena').isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres'),
  check('id_rol').notEmpty().withMessage('El rol es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
