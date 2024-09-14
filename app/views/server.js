// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'static'
app.use(express.static(path.join(__dirname, 'static')));

// Manejar ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Manejar ruta para la página de propiedades
app.get('/properties', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'properties.html'));
});

// Manejar ruta para la página de tipos de propiedad
app.get('/propertyTypes', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'propertyTypes.html'));
});

// Manejar ruta para la página de dueños
app.get('/owners', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'owners.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});