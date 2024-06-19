const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Contrato = require('./contratom');
const Area = require('./aream');

const Presupuesto = sequelize.define('Presupuesto', {
  id_presupuesto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Contrato,
      key: 'id_contrato',
    }
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'id_area',
    }
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'presupuesto',
  timestamps: false,
});

module.exports = Presupuesto;
