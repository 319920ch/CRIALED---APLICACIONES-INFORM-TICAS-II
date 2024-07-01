const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Estado = require('./estadom');

class Proyecto extends Model {}

Proyecto.init({
  id_proyecto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    references: {
      model: Estado,
      key: 'id_estado',
    }
  },
  nombre_proyecto: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Proyecto',
});

module.exports = Proyecto;
