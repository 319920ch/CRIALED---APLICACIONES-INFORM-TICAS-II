const Rol = require('../models/rolm');

exports.createRolService = async (data) => {
  const existingRole = await Rol.findOne({ where: { nombre_rol: data.nombre_rol } });
  if (existingRole) {
    throw new Error('El nombre del rol ya está en uso');
  }
  return await Rol.create(data);
};

exports.getRolesService = async () => {
  return await Rol.findAll();
};

exports.getRolByIdService = async (id) => {
  return await Rol.findByPk(id);
};

exports.updateRolService = async (id, data) => {
  const rol = await Rol.findByPk(id);
  if (rol) {
    await rol.update(data);
    return rol;
  }
  throw new Error('Rol no encontrado');
};

exports.deleteRolService = async (id) => {
  const rol = await Rol.findByPk(id);
  if (rol) {
    await rol.destroy();
    return;
  }
  throw new Error('Rol no encontrado');
};
