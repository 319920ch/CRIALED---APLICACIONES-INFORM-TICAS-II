const express = require('express');
const router = express.Router();
const areaController = require('../controllersAndServices/areaController'); // Cambiado de authController a areaController

router.post('/', areaController.createArea); // Asegúrate de que createArea esté definido en areaController
router.get('/', areaController.getAreas);
router.get('/:id', areaController.getAreaById);
router.put('/:id', areaController.updateArea);
router.delete('/:id', areaController.deleteArea);

module.exports = router;
