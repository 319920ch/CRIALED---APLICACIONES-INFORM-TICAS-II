const { verifyToken } = require('./jwt');
const Usuario = require('../models/usuariom');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const bearerToken = token.split(' ')[1]; // Quitar 'Bearer ' del token
  const payload = verifyToken(bearerToken);
  if (!payload) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.userId = payload.id;

  // Obtener el usuario y verificar el rol
  const usuario = await Usuario.findByPk(req.userId);
  if (!usuario) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = usuario;
  next();
};

const checkRole = (rolesPermitidos) => (req, res, next) => {
  if (!rolesPermitidos.includes(req.user.id_rol)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authMiddleware, checkRole };
