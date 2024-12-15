const express = require('express');
const bodyParser = require('body-parser');
const formularioRoutes = require('./routes/formulario');
const cors = require('cors');
const app = express();

// Configuración del middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.redirect('/formulario');
});
app.use('/formulario', formularioRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
