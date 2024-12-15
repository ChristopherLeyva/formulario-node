const express = require('express');
const bodyParser = require('body-parser');
const formularioRoutes = require('./routes/formulario');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.use('/formulario', formularioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
