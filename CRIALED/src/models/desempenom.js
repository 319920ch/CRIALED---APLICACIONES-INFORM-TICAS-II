const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Area = require('./aream');

const Desempeno = sequelize.define('Desempeno', {
  id_desempeno: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'id_area',
    }
  },
  tiempo_desempeño: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  puntuación_desempeño: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'desempeno',
  timestamps: false,
});

module.exports = Desempeno;
