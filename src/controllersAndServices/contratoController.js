const Contrato = require('../models/contratom');
const { validationResult } = require('express-validator');

exports.createContrato = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id_estado, cliente, fecha_inicio, fecha_fin, presupuesto } = req.body;

    const nuevoContrato = await Contrato.create({
      id_estado,
      cliente,
      fecha_inicio,
      fecha_fin,
      presupuesto,
    });

    res.status(201).json(nuevoContrato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContratos = async (req, res) => {
  try {
    const contratos = await Contrato.findAll();
    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContratoById = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (contrato) {
      res.status(200).json(contrato);
    } else {
      res.status(404).json({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContrato = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (contrato) {
      await contrato.update(req.body);
      res.status(200).json(contrato);
    } else {
      res.status(404).json({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContrato = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (contrato) {
      await contrato.destroy();
      res.status(204).json({ message: 'Contrato eliminado' });
    } else {
      res.status(404).json({ message: 'Contrato no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
