const express = require('express');
const path = require('path');
const app = express();

// Configura la carpeta donde están tus archivos HTML, CSS, etc.
app.use(express.static(path.join(__dirname)));

// Define la ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configura el puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
