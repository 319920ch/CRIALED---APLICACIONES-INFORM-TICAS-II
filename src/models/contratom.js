const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Proyecto = require('./proyectom');

const Contrato = sequelize.define('Contrato', {
  id_contrato: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_proyecto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proyecto,
      key: 'id_proyecto',
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'contrato',
  timestamps: false,
});

module.exports = Contrato;
