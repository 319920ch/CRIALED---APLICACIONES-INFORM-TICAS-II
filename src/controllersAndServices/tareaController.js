const Tarea = require('../models/taream');

// Crear una nueva tarea
exports.createTarea = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las tareas
exports.getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una tarea por ID
exports.getTareaById = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (tarea) {
      res.status(200).json(tarea);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea por ID
exports.updateTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (tarea) {
      await tarea.update(req.body);
      res.status(200).json(tarea);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea por ID
exports.deleteTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (tarea) {
      await tarea.destroy();
      res.status(204).json({ message: 'Tarea eliminada' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
