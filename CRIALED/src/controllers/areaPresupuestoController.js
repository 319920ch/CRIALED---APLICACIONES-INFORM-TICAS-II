const Proyecto = require('../models/proyectom');
const Area = require('../models/aream');
const Presupuesto = require('../models/presupuestom');
const Contrato = require('../models/contratom');

exports.asignarAreasProyecto = async (req, res) => {
  try {
    const { id_proyecto, id_contrato, areas } = req.body;
    const proyecto = await Proyecto.findByPk(id_proyecto, {
      include: [
        {
          model: Contrato,
          attributes: ['cliente']
        }
      ]
    });
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const areasAsignadas = [];
    for (const area of areas) {
        const areaExistente = await Area.findOne({
            where: { nombre_area: area.nombre_area },
            attributes: ['id_area', 'nombre_area'] // Include id_area attribute
          });
      if (!areaExistente) {
        return res.status(404).json({ error: `Área ${area.nombre_area} no encontrada` });
      }

      const presupuesto = await Presupuesto.create({
        id_proyecto,
        id_contrato,
        id_area: areaExistente.id_area,
        monto: 0 // Inicializar monto en 0, puede ser actualizado luego
      });

      areasAsignadas.push({
        nombre_cliente: proyecto.Contrato.nombre_cliente,
        nombre_proyecto: proyecto.nombre_proyecto,
        nombre_area: areaExistente.nombre_area,
        monto: presupuesto.monto
      });
    }

    res.status(201).json({
      message: 'Áreas asignadas al proyecto',
      areasAsignadas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.modificarPresupuestoArea = async (req, res) => {
    try {
      const { id_contrato, id_proyecto, id_area, nuevo_monto } = req.body;
      const presupuestos = await Presupuesto.update({
        monto: nuevo_monto
      }, {
        where: {
          id_proyecto,
          id_contrato,
          id_area
        }
      });
  
      res.status(200).json({
        message: 'Presupuestos actualizados',
        presupuestos
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
