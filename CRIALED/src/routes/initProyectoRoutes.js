const express = require('express');
const router = express.Router();
const initProyectoController = require('../controllers/initProyectoController');

router.post('/iniciar', initProyectoController.initProyecto);
router.post('/actualizarEstado', initProyectoController.updateEstadoProyecto);

module.exports = router;
