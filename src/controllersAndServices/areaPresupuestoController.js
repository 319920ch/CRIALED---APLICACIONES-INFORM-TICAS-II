const Proyecto = require('../models/proyectom');
const Area = require('../models/aream');
const Presupuesto = require('../models/presupuestom');
const Contrato = require('../models/contratom');

exports.asignarAreasProyecto = async (id_proyecto, id_contrato, areas) => {
  try {
    const proyecto = await Proyecto.findByPk(id_proyecto, {
      include: [
        {
          model: Contrato,
          attributes: ['cliente']
        }
      ]
    });
    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    const areasAsignadas = [];
    for (const area of areas) {
        const areaExistente = await Area.findOne({
            where: { nombre_area: area.nombre_area },
            attributes: ['id_area', 'nombre_area']
          });
      if (!areaExistente) {
        throw new Error(`Área ${area.nombre_area} no encontrada`);
      }

      const presupuesto = await Presupuesto.create({
        id_proyecto,
        id_contrato,
        id_area: areaExistente.id_area,
        monto: 0
      });

      areasAsignadas.push({
        nombre_cliente: proyecto.Contrato.nombre_cliente,
        nombre_proyecto: proyecto.nombre_proyecto,
        nombre_area: areaExistente.nombre_area,
        monto: presupuesto.monto
      });
    }

    return areasAsignadas;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.modificarPresupuestoArea = async (id_contrato, id_proyecto, id_area, nuevo_monto) => {
  try {
    const presupuestos = await Presupuesto.update({
      monto: nuevo_monto
    }, {
      where: {
        id_proyecto,
        id_contrato,
        id_area
      }
    });

    return presupuestos;
  } catch (error) {
    throw new Error(error.message);
  }
};
