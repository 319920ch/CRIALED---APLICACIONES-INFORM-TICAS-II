const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Usuario = require('./usuariom');
const Tarea = require('./taream');

const Asignacion = sequelize.define('Asignacion', {
  id_asignacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario',
    }
  },
  id_tarea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tarea,
      key: 'id_tarea',
    }
  }
}, {
  tableName: 'asignacion',
  timestamps: false,
});

module.exports = Asignacion;
