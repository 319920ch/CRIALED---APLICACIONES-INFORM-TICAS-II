const Asignacion = require('../models/asignacionm');

// Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
  try {
    const asignacion = await Asignacion.create(req.body);
    res.status(201).json(asignacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las asignaciones
exports.getAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una asignación por ID
exports.getAsignacionById = async (req, res) => {
  try {
    const asignacion = await Asignacion.findByPk(req.params.id);
    if (asignacion) {
      res.status(200).json(asignacion);
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una asignación por ID
exports.updateAsignacion = async (req, res) => {
  try {
    const asignacion = await Asignacion.findByPk(req.params.id);
    if (asignacion) {
      await asignacion.update(req.body);
      res.status(200).json(asignacion);
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una asignación por ID
exports.deleteAsignacion = async (req, res) => {
  try {
    const asignacion = await Asignacion.findByPk(req.params.id);
    if (asignacion) {
      await asignacion.destroy();
      res.status(204).json({ message: 'Asignación eliminada' });
    } else {
      res.status(404).json({ message: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
