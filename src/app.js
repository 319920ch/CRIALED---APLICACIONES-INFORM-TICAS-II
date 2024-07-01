require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const contratoRoutes = require('./routes/contratoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); 
const rolRoutes = require('./routes/rolRoutes');

const app = express();

// Configura la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Configura el middleware de sesión
app.use(session({
  store: new pgSession({
    pool: pool,                // Conexión a la base de datos
    tableName: 'session'       // Nombre de la tabla para almacenar sesiones
  }),
  secret: process.env.SESSION_SECRET || 'crialed2024', // Cambia esto por una clave secreta segura
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Asegúrate de usar secure: true en producción
    httpOnly: true, // Mejora la seguridad de las cookies
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/contratos', contratoRoutes);
app.use('/api/usuarios', usuarioRoutes); // Asegúrate de usar las rutas de usuarios

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Ruta para usuarios
app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'usuarios.html'));
});

// Ruta para roles
app.get('/roles', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'roles.html'));
});

// Ruta para forgot-password
app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'forgot-password.html'));
});

app.use('/api/roles', rolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
