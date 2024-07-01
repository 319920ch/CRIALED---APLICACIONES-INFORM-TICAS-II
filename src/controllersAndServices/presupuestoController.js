const Presupuesto = require('../models/presupuestom');

// Crear un nuevo presupuesto
exports.createPresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.create(req.body);
    res.status(201).json(presupuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los presupuestos
exports.getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.findAll();
    res.status(200).json(presupuestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un presupuesto por ID
exports.getPresupuestoById = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findByPk(req.params.id);
    if (presupuesto) {
      res.status(200).json(presupuesto);
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un presupuesto por ID
exports.updatePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findByPk(req.params.id);
    if (presupuesto) {
      await presupuesto.update(req.body);
      res.status(200).json(presupuesto);
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un presupuesto por ID
exports.deletePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findByPk(req.params.id);
    if (presupuesto) {
      await presupuesto.destroy();
      res.status(204).json({ message: 'Presupuesto eliminado' });
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
