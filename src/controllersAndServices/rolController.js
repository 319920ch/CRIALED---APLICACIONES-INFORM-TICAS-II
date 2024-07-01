const {
  createRolService,
  getRolesService,
  getRolByIdService,
  updateRolService,
  deleteRolService
} = require('./rolService');

exports.createRol = async (req, res) => {
  try {
    const rol = await createRolService(req.body);
    res.status(201).json(rol);
  } catch (error) {
    if (error.message === 'El nombre del rol ya está en uso') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await getRolesService();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRolById = async (req, res) => {
  try {
    const rol = await getRolByIdService(req.params.id);
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const rol = await updateRolService(req.params.id, req.body);
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRol = async (req, res) => {
  try {
    await deleteRolService(req.params.id);
    res.status(204).json({ message: 'Rol eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
