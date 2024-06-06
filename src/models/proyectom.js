const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Proyecto = sequelize.define('Proyecto', {
  id_proyecto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_proyecto: {
    type: DataTypes.STRING,
    allowNull: false,
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
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: 'proyecto',
  timestamps: false,
});

module.exports = Proyecto;
