const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');

const Area = sequelize.define('Area', {
  id_area: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_area: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'area',
  timestamps: false,
});

module.exports = Area;
