const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Estado = require('./estadom');

class Empleado extends Model {}

Empleado.init({
  id_empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    references: {
      model: Estado,
      key: 'id_estado',
    }
  },
}, {
  sequelize,
  modelName: 'Empleado',
});

module.exports = Empleado;
