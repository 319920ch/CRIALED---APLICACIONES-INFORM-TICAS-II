const { check, validationResult } = require('express-validator');

exports.registroValidationRules = () => [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  check('correo_electronico')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .notEmpty().withMessage('El correo electrónico es obligatorio'),
  check('contrasena')
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  check('id_rol')
    .notEmpty().withMessage('El rol es obligatorio')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
