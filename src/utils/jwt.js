const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'crialed2024';  // La clave secreta en el archivo .env

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return null;
  }
};
