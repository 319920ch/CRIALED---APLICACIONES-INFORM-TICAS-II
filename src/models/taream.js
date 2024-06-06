const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexiones');
const Proyecto = require('./proyectom');
const Area = require('./aream');

const Tarea = sequelize.define('Tarea', {
  id_tarea: {
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
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'id_area',
    }
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  cant_necesaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'tarea',
  timestamps: false,
});

module.exports = Tarea;
