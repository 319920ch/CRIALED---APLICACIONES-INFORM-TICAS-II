// Función para validar cédula ecuatoriana
function validarCedulaEcuatoriana(cedula) {
    if (cedula.length !== 10) return false;
  
    const digitos = cedula.split('').map(Number);
    const codigoProvincia = digitos[0] * 10 + digitos[1];
  
    if (codigoProvincia < 1 || codigoProvincia > 24) return false;
  
    const digitoVerificador = digitos.pop();
  
    const sumaPares = digitos.filter((_, idx) => idx % 2 !== 0).reduce((a, b) => a + b, 0);
    const sumaImpares = digitos.filter((_, idx) => idx % 2 === 0).map(n => (n * 2 > 9 ? n * 2 - 9 : n * 2)).reduce((a, b) => a + b, 0);
    const sumaTotal = sumaPares + sumaImpares;
    
    const digitoCalculado = (10 - (sumaTotal % 10)) % 10;
  
    return digitoCalculado === digitoVerificador;
  }
  
  // Función para validar fechas de contrato
  function validarFechasContrato(fechaInicio, fechaFin) {
    const dias = (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24);
    if (dias < 24 || dias > 864) {
      throw new Error('El contrato debe tener una duración entre 24 y 864 días.');
    }
  }
  
  // Función para validar fechas de proyecto
  function validarFechasProyecto(fechaInicio, fechaFin) {
    const dias = (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24);
    if (dias < 20 || dias > 720) {
      throw new Error('El proyecto debe tener una duración entre 20 y 720 días.');
    }
  }
  
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
  function calcularAsignaciones(tiempoTotal, avanceDiario) {
    const tiempoDistribuido = distribuirTiempoProyecto(tiempoTotal);
  
    return tiempoDistribuido.map(proceso => {
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
  }
  
  module.exports = {
    validarCedulaEcuatoriana,
    validarFechasContrato,
    validarFechasProyecto,
    calcularAsignaciones
  };

  const { body, validationResult } = require('express-validator');

const registroValidationRules = () => {
  return [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').bail(),
    body('correo_electronico').isEmail().withMessage('Debe ser un correo válido').bail(),
    body('contrasena').isLength({ min: 5, max: 25 }).withMessage('La contraseña debe tener entre 5 y 25 caracteres').bail(),
    body('nombre').custom(async (value) => {
      const Usuario = require('../models/usuariom');
      const usuario = await Usuario.findOne({ where: { nombre: value } });
      if (usuario) {
        return Promise.reject('El nombre de usuario ya está en uso');
      }
    }).bail(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registroValidationRules,
  validate,
};
