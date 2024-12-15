const express = require('express');
const bodyParser = require('body-parser');
const formularioRoutes = require('./routes/formulario');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.use('/formulario', formularioRoutes);

const PORT = 80;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
