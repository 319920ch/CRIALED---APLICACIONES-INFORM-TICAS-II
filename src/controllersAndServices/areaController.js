const Area = require('../models/aream');

exports.createArea = async (req, res) => {
  try {
    const nuevaArea = await Area.create(req.body);
    res.status(201).json(nuevaArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAreaById = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);
    if (area) {
      res.status(200).json(area);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateArea = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);
    if (area) {
      await area.update(req.body);
      res.status(200).json(area);
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteArea = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);
    if (area) {
      await area.destroy();
      res.status(204).json({ message: 'Área eliminada' });
    } else {
      res.status(404).json({ message: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
