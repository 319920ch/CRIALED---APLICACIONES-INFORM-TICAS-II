const Usuario = require('../models/usuariom');
const { registroValidationRules, validate } = require('../utils/validaciones');

exports.register = [
  registroValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { nombre, correo_electronico, contrasena, id_rol } = req.body;
      const nuevoUsuario = await Usuario.create({
        nombre,
        correo_electronico,
        contrasena,
        id_rol
      });
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, correo_electronico, contrasena, id_rol } = req.body;
    const existingUser = await Usuario.findOne({ where: { nombre } });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }
    const usuario = await Usuario.create({ nombre, correo_electronico, contrasena, id_rol });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.update(req.body);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
