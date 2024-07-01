const Proyecto = require('../models/proyectom');

// Iniciar un proyecto
exports.initProyecto = async (id_contrato, fecha_inicio, fecha_fin, nombre_proyecto) => {
  try {
    const proyecto = await Proyecto.create({
      id_contrato,
      fecha_inicio,
      fecha_fin,
      id_estado: 1, // Estado inicial del proyecto
      nombre_proyecto,
    });

    return proyecto;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar el estado de un proyecto
exports.updateEstadoProyecto = async (id_proyecto, id_estado) => {
  try {
    const proyecto = await Proyecto.findByPk(id_proyecto);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    await proyecto.update({ id_estado });
    return proyecto;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar la fecha de fin de un proyecto
exports.updateFechaFinProyecto = async (id_proyecto, fecha_fin) => {
  try {
    const proyecto = await Proyecto.findByPk(id_proyecto);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    await proyecto.update({ fecha_fin });
    return proyecto;
  } catch (error) {
    throw new Error(error.message);
  }
};
