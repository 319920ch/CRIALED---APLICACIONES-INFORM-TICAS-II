const Estado = require('../models/estadom');

// Crear un nuevo estado
exports.createEstado = async (req, res) => {
  try {
    const estado = await Estado.create(req.body);
    res.status(201).json(estado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los estados
exports.getEstados = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estado por ID
exports.getEstadoById = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      res.status(200).json(estado);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estado por ID
exports.updateEstado = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      await estado.update(req.body);
      res.status(200).json(estado);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estado por ID
exports.deleteEstado = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (estado) {
      await estado.destroy();
      res.status(204).json({ message: 'Estado eliminado' });
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
