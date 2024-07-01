const express = require('express');
const router = express.Router();
const path = require('path');

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

// Ruta para servir archivos estáticos
router.use(express.static(path.join(__dirname, '../public')));

// Ruta predeterminada para redirigir a index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
