const Proyecto = require('../models/proyectom');
const { validationResult } = require('express-validator');

exports.createProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id_estado, nombre_proyecto, fecha_inicio, fecha_fin } = req.body;

    const nuevoProyecto = await Proyecto.create({
      id_estado,
      nombre_proyecto,
      fecha_inicio,
      fecha_fin,
    });

    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProyectoById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      await proyecto.update(req.body);
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      await proyecto.destroy();
      res.status(204).json({ message: 'Proyecto eliminado' });
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
