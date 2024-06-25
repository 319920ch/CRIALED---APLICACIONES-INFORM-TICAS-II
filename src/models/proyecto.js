// models/proyecto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Contrato = require('./contratom');
const Estado = require('./estadom');

const Proyecto = sequelize.define('Proyecto', {
  id_proyecto: {
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
  nombre_proyecto: {
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
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estado,
      key: 'id_estado',
    }
  }
}, {
  tableName: 'proyecto',
  timestamps: false,
});

Proyecto.belongsTo(Estado, { foreignKey: 'id_estado', onDelete: 'CASCADE' });
Proyecto.belongsTo(Contrato, { foreignKey: 'id_contrato' });

module.exports = Proyecto;
