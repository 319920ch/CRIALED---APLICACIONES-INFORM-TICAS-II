const Presupuesto = require('../models/presupuestom');

// Crear un nuevo presupuesto
exports.createPresupuesto = async (req, res) => {
  try {
    const nuevoPresupuesto = await Presupuesto.create(req.body);
    res.status(201).json(nuevoPresupuesto);
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
    const [updated] = await Presupuesto.update(req.body, {
      where: { id_presupuesto: req.params.id }
    });
    if (updated) {
      const updatedPresupuesto = await Presupuesto.findByPk(req.params.id);
      res.status(200).json(updatedPresupuesto);
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
    const deleted = await Presupuesto.destroy({
      where: { id_presupuesto: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Presupuesto eliminado' });
    } else {
      res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
