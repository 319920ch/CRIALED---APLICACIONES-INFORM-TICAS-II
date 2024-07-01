const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuariom');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const { username: nombre, password: contrasena } = req.body;

  console.log('Request body:', req.body); // Log para ver el cuerpo de la solicitud

  // Verificar si los campos están presentes
  if (!nombre || !contrasena) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    console.log('Login attempt:', nombre); // Log para depuración

    // Buscar el usuario por nombre
    const user = await Usuario.findOne({ where: { nombre } });

    // Verificar si el usuario existe
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Nombre de usuario incorrecto' });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await user.validatePassword(contrasena);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    console.error('Server error:', error); // Log para depuración
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.register = async (req, res) => {
  // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, correo_electronico, contrasena, id_rol } = req.body;

  try {
    // Verificar si el nombre de usuario ya existe
    const userExists = await Usuario.findOne({ where: { nombre } });
    if (userExists) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = await Usuario.create({
      nombre,
      correo_electronico,
      contrasena: hashedPassword,
      id_rol
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.forgotPassword = async (req, res) => {
  // Implementación de forgotPassword
};

exports.resetPassword = async (req, res) => {
  // Implementación de resetPassword
};
