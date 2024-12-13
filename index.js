const express = require('express');
const mysql = require('mysql2/promise'); // O mysql en lugar de mysql2 si no usas promesas
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://3.85.51.133', // Ajusta este valor a tu dominio permitido
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.static('public'));

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mi_base_datos'
});

conexion.connect((error) => {
    if (error) {
        console.log('Error conectando a la base de datos: ' + error.stack);
    } else {
        console.log('Conectado a la base de datos');
    }
});

app.post('/registro', async (req, res) => {
    const { nombre, apellido, telefono, correo, consulta } = req.body;

    console.log('Datos recibidos:', req.body); // Verifica los datos recibidos

    if (!nombre || !apellido || !correo || !telefono || !consulta) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const query = 'INSERT INTO usuarios (Nombre, Apellido, Telefono, Correo,Consulta) VALUES (?, ?, ?, ? ,?)';
        const [result] = await conexion.execute(query, [nombre, apellido, telefono, correo, consulta]);
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

app.listen(port, () => {
    console.log(`Server on port http://3.85.51.133/:${port}`);
});
