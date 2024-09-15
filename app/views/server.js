const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'static'
app.use(express.static(path.join(__dirname, 'static')));


// Manejar rutas de API y redirigirlas al backend
app.use('/api', (req, res) => {
  const apiUrl = `http://localhost:5000${req.url}`;
  console.log(`Request URL: ${apiUrl}`); // Verificar la URL solicitada

  fetch(apiUrl)
      .then(response => {
          console.log(`Backend response status: ${response.status}`); // Verifica el estado de la respuesta
          return response.json();
      })
      .then(data => {
          console.log('Data received from backend:', data); // Verifica los datos que vienen del backend
          res.json(data);
      }) 
      .catch(error => {
          console.error('Error fetching data from backend:', error); // Captura errores y muestra el error
          res.status(500).json({ error: 'Error fetching data from backend' });
      });
});

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