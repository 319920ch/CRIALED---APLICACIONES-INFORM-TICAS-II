require('dotenv').config();

const { Sequelize } = require('sequelize');

const dbConfig = {
  database: process.env.DB_NAME || 'CRIALED',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Holamundo14',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5434,
  dialect: 'postgres'
};

try {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
  });

  // Prueba la conexión
  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      process.exit(1);
    });

  module.exports = sequelize;
} catch (error) {
  console.error('Error connecting to database:', error);
  process.exit(1);
}
