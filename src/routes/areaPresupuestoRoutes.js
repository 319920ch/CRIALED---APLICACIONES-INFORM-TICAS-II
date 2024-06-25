const express = require('express');
const router = express.Router();
const areasPresupuesto = require('../controllers/areaPresupuestoController');

router.post('/iniciar', areasPresupuesto.asignarAreasProyecto);
router.put('/modificarP', areasPresupuesto.modificarPresupuestoArea);

module.exports = router;
