require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index'); // Asegúrate de que la ruta sea correcta

// Middleware para manejar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar las rutas
app.use('/api', routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
