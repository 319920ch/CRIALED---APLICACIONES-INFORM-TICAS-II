// controllers/proyectoController.js
const Proyecto = require('../models/proyecto');
axios = require('axios');

// Parámetros de los procesos
const procesos = [
  { nombre: 'CORTE', porcentaje: 0.2, minEmpleado: 2, minFecha: 4, maxEmpleado: 100, maxFecha: 144, ajuste: 1.2 },
  { nombre: 'SOLDADURA', porcentaje: 0.2, minEmpleado: 2, minFecha: 4, maxEmpleado: 100, maxFecha: 144, ajuste: 1.2 },
  { nombre: 'PINTURA', porcentaje: 0.3, minEmpleado: 3, minFecha: 6, maxEmpleado: 100, maxFecha: 216, ajuste: 1.3 },
  { nombre: 'ENSAMBLAJE', porcentaje: 0.2, minEmpleado: 2, minFecha: 4, maxEmpleado: 100, maxFecha: 144, ajuste: 1.2 },
  { nombre: 'VERIFICACION DE CALIDAD', porcentaje: 0.1, minEmpleado: 1, minFecha: 2, maxEmpleado: 100, maxFecha: 72, ajuste: 1.1 }
];

// Función para calcular empleados necesarios usando una fórmula
function calcularEmpleados(tiempo, minEmpleado, minFecha, maxEmpleado, maxFecha) {
  if (tiempo < minFecha) {
    return minEmpleado;
  } else if (tiempo > maxFecha) {
    return maxEmpleado;
  } else {
    return minEmpleado + ((tiempo - minFecha) * (maxEmpleado - minEmpleado)) / (maxFecha - minFecha);
  }
}

// Función para distribuir el tiempo del proyecto entre los procesos
function distribuirTiempoProyecto(tiempoTotal) {
  return procesos.map(proceso => ({
    ...proceso,
    tiempoAsignado: tiempoTotal * proceso.porcentaje
  }));
}

// Función para ajustar empleados según el avance diario
function ajustarEmpleadosPorAvance(empleadosActuales, avanceDiario, objetivoAvance, ajuste) {
  if (avanceDiario < objetivoAvance) {
    return empleadosActuales * ajuste;
  } else {
    return empleadosActuales;
  }
}

// Función principal para calcular asignaciones de empleados
async function calcularAsignaciones(req, res) {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const fechaInicio = new Date(proyecto.fecha_inicio);
    const fechaFin = new Date(proyecto.fecha_fin);
    const tiempoTotalProyecto = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24)); // Diferencia en días

    // Aquí asumimos que recibimos el avance diario del proyecto. Esto puede cambiar según cómo planeas obtener esta información.
    const avanceDiario = 0.15; // Ejemplo: avance diario del 15%

    const tiempoDistribuido = distribuirTiempoProyecto(tiempoTotalProyecto);

    const asignaciones = tiempoDistribuido.map(proceso => {
      let empleadosNecesarios = calcularEmpleados(
        proceso.tiempoAsignado,
        proceso.minEmpleado,
        proceso.minFecha,
        proceso.maxEmpleado,
        proceso.maxFecha
      );

      empleadosNecesarios = ajustarEmpleadosPorAvance(
        empleadosNecesarios,
        avanceDiario,
        proceso.porcentaje,
        proceso.ajuste
      );

      return {
        proceso: proceso.nombre,
        empleadosAsignados: Math.ceil(empleadosNecesarios)
      };
    });

    res.json(asignaciones);
  } catch (error) {
    console.error('Error al calcular asignaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  createProyecto,
  getProyectos,
  getProyectoById,
  updateProyecto,
  deleteProyecto,
  calcularAsignaciones
};
