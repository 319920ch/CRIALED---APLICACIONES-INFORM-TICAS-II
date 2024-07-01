const Usuario = require('../models/usuariom');
const { generateToken, verifyToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/mailer');
const bcrypt = require('bcryptjs'); // Asegúrate de tener esta línea para importar bcrypt

exports.forgotPasswordService = async (correo_electronico, protocol, host) => {
  const user = await Usuario.findOne({ where: { correo_electronico } });
  if (!user) {
    throw new Error('El correo electrónico no está registrado');
  }

  const token = generateToken({ id: user.id });
  const resetLink = `${protocol}://${host}/reset-password.html?token=${token}`;
  await sendEmail(correo_electronico, 'Restablecer contraseña', `Hola,\n\nPara restablecer tu contraseña, visita el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste un restablecimiento de contraseña, ignora este correo electrónico.\n\nSaludos,\nEl equipo de CRIALED`);
};

exports.resetPasswordService = async (token, contrasena) => {
  const payload = verifyToken(token, '1h');
  if (!payload) {
    throw new Error('El token de restablecimiento de contraseña ha expirado');
  }

  const user = await Usuario.findByPk(payload.id);
  if (!user) {
    throw new Error('El usuario no existe');
  }

  await user.update({ contrasena: bcrypt.hashSync(contrasena, 8) });
};

exports.loginService = async (nombre, contrasena) => {
  const user = await Usuario.findOne({ where: { nombre } });
  if (!user) {
    throw new Error('Nombre de usuario incorrecto');
  }

  const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  const token = generateToken({ id: user.id });
  return { user, token };
};

exports.registerService = async (nombre, correo_electronico, contrasena, id_rol) => {
  const existingUser = await Usuario.findOne({ where: { nombre } });
  if (existingUser) {
    throw new Error('Ya existe el usuario');
  }
  const hashedPassword = bcrypt.hashSync(contrasena, 8);
  const user = await Usuario.create({
    nombre,
    correo_electronico,
    contrasena: hashedPassword,
    id_rol,
  });
  return user;
};
