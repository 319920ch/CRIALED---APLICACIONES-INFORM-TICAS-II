const Usuario = require('../models/usuariom');

const authMiddleware = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Acceso denegado. No has iniciado sesión.' });
  }

  try {
    const user = await Usuario.findByPk(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

/*const verifyRoleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.id_rol)) {
      return res.status(403).json({ message: 'No dispones del rol para este proceso' });
    }
    next();
  };
};
PENDIENTE */

module.exports = { authMiddleware /*verifyRoleMiddleware*/ };
