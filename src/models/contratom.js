const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Estado = require('./estadom');

class Contrato extends Model {}

Contrato.init({
  id_contrato: {
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
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  presupuesto: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Contrato',
});

module.exports = Contrato;
