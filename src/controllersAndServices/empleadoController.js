const Empleado = require('../models/empleadom');
const { validationResult } = require('express-validator');

exports.createEmpleado = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombres, apellidos, cedula, id_estado } = req.body;

    const nuevoEmpleado = await Empleado.create({
      nombres,
      apellidos,
      cedula,
      id_estado,
    });

    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un empleado por ID
exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un empleado por ID
exports.updateEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (empleado) {
      await empleado.update(req.body);
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un empleado por ID
exports.deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (empleado) {
      await empleado.destroy();
      res.status(204).json({ message: 'Empleado eliminado' });
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
