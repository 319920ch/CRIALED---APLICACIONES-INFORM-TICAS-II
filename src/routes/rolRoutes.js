const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Rutas para los roles
router.post('/', rolController.createRol);
router.get('/', rolController.getRoles);
router.get('/:id', rolController.getRolById);
router.put('/:id', rolController.updateRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;
