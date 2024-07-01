const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

class Estado extends Model {}

Estado.init({
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_estado: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Estado',
});

module.exports = Estado;
