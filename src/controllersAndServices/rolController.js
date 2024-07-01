const rolService = require('../controllersAndServices/rolService');

exports.createRol = async (req, res) => {
  try {
    const rol = await rolService.createRolService(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await rolService.getRolesService();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRolById = async (req, res) => {
  try {
    const rol = await rolService.getRolByIdService(req.params.id);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const rol = await rolService.updateRolService(req.params.id, req.body);
    res.status(200).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRol = async (req, res) => {
  try {
    await rolService.deleteRolService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
