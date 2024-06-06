const sequelize = require('../database/conexiones.js');
const Proyecto = require('./proyectom.js');
const Area = require('./aream');
const Desempeno = require('./desempenom');
const Contrato = require('./contratom');
const Presupuesto = require('./presupuestom');
const Rol = require('./rolm');
const Usuario = require('./usuariom');
const Tarea = require('./taream');
const Asignacion = require('./asignacionm');
const Empleado = require('./empleadom');

// Definir las relaciones entre los modelos
Area.hasMany(Desempeno, { foreignKey: 'id_area' });
Desempeno.belongsTo(Area, { foreignKey: 'id_area' });

Proyecto.hasMany(Contrato, { foreignKey: 'id_proyecto' });
Contrato.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

Contrato.hasMany(Presupuesto, { foreignKey: 'id_contrato' });
Presupuesto.belongsTo(Contrato, { foreignKey: 'id_contrato' });

Area.hasMany(Presupuesto, { foreignKey: 'id_area' });
Presupuesto.belongsTo(Area, { foreignKey: 'id_area' });

Rol.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

Proyecto.hasMany(Tarea, { foreignKey: 'id_proyecto' });
Tarea.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

Area.hasMany(Tarea, { foreignKey: 'id_area' });
Tarea.belongsTo(Area, { foreignKey: 'id_area' });

Usuario.hasMany(Asignacion, { foreignKey: 'id_usuario' });
Asignacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Tarea.hasMany(Asignacion, { foreignKey: 'id_tarea' });
Asignacion.belongsTo(Tarea, { foreignKey: 'id_tarea' });

Desempeno.hasMany(Empleado, { foreignKey: 'id_desempeno' });
Empleado.belongsTo(Desempeno, { foreignKey: 'id_desempeno' });

module.exports = {
  sequelize,
  Proyecto,
  Area,
  Desempeno,
  Contrato,
  Presupuesto,
  Rol,
  Usuario,
  Tarea,
  Asignacion,
  Empleado
};

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ force: false }) // force: true eliminará las tablas existentes y las volverá a crear
  .then(() => {
    console.log('Tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });