const express = require('express');
const path = require('path');
const router = express.Router();
const { validarUnicoContratoActivo, obtenerRecomendaciones } = require('../procesos/contrato.js');
const { validarCedulaEcuatoriana, validarFechasContrato, validarFechasProyecto } = require('../procesos/validaciones.js');

// Importar y usar las rutas de cada entidad
const areaRoutes = require('./areaRoutes');
const asignacionRoutes = require('./asignacionRoutes');
const contratoRoutes = require('./contratoRoutes');
const desempenoRoutes = require('./desempenoRoutes');
const empleadoRoutes = require('./empleadoRoutes');
const presupuestoRoutes = require('./presupuestoRoutes');
const proyectoRoutes = require('./proyectoRoutes');
const rolRoutes = require('./rolRoutes');
const tareaRoutes = require('./tareaRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const estadoRoutes = require('./estadoRoutes');
const authRoutes = require('./authRoutes');
const proyectosRoutes = require('./initProyectoRoutes');
const areasPresupuesto = require('./areaPresupuestoRoutes');

router.use('/areas', areaRoutes);
router.use('/asignaciones', asignacionRoutes);
router.use('/contratos', contratoRoutes);
router.use('/desempenos', desempenoRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/presupuestos', presupuestoRoutes);
router.use('/proyectos', proyectoRoutes);
router.use('/roles', rolRoutes);
router.use('/tareas', tareaRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/estados', estadoRoutes);
router.use('/auth', authRoutes);
router.use('/initProyecto', proyectosRoutes);
router.use('/areasPresupuesto', areasPresupuesto);

// Ruta para crear un nuevo contrato
router.post('/contratos', async (req, res) => {
    try {
      const { empleadoId, fechaInicio, fechaFin, activo } = req.body;
  
      // Validar fechas del contrato
      validarFechasContrato(fechaInicio, fechaFin);
  
      // Validar que solo haya un contrato activo
      await validarUnicoContratoActivo();
  
      const contrato = await Contract.create({ empleadoId, fechaInicio, fechaFin, activo });
      res.status(201).json(contrato);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Ruta para obtener recomendaciones de asignación de empleados
  router.get('/proyectos/:proyectoId/recomendaciones', async (req, res) => {
    try {
      const proyectoId = req.params.proyectoId;
      const asignaciones = await obtenerRecomendaciones(proyectoId);
      res.json(asignaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Ruta para validar cédula ecuatoriana
  router.post('/validar-cedula', (req, res) => {
    try {
      const { cedula } = req.body;
      const esValida = validarCedulaEcuatoriana(cedula);
  
      if (esValida) {
        res.status(200).json({ mensaje: 'Cédula válida' });
      } else {
        res.status(400).json({ mensaje: 'Cédula inválida' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Ruta para crear un nuevo proyecto con validación de fechas
  router.post('/proyectos', async (req, res) => {
    try {
      const { nombre, fechaInicio, fechaFin } = req.body;
  
      // Validar fechas del proyecto
      validarFechasProyecto(fechaInicio, fechaFin);
  
      const proyecto = await Project.create({ nombre, fechaInicio, fechaFin });
      res.status(201).json(proyecto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Ruta predeterminada para redirigir a index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
