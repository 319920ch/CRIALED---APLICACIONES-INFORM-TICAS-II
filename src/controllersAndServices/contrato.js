const { Contract, Project } = require('../models/contratom.js'); 
const { calcularAsignaciones } = require('./validaciones.js');

// Función para validar que solo haya un contrato activo a la vez
async function validarUnicoContratoActivo() {
  const contratoActivo = await Contract.findOne({ where: { activo: true } });
  if (contratoActivo) {
    throw new Error('Ya existe un contrato activo.');
  }
}

// Función para obtener el tiempo total del proyecto en días
async function obtenerTiempoTotalProyecto(proyectoId) {
  const proyecto = await Project.findByPk(proyectoId);
  if (!proyecto) {
    throw new Error('Proyecto no encontrado');
  }

  const fechaInicio = new Date(proyecto.fechaInicio);
  const fechaFin = new Date(proyecto.fechaFin);
  const tiempoTotal = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24)); // Diferencia en días

  return tiempoTotal;
}

// Función para obtener recomendaciones de asignación de empleados
async function obtenerRecomendaciones(proyectoId) {
  const tiempoTotalProyecto = await obtenerTiempoTotalProyecto(proyectoId);
  const avanceDiario = 0.15; 
  const asignaciones = calcularAsignaciones(tiempoTotalProyecto, avanceDiario);

  return asignaciones;
}

module.exports = {
  validarUnicoContratoActivo,
  obtenerRecomendaciones
};
