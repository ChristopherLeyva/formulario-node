const express = require('express');
const port = 3000;
const mysql = require('mysql');
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

/Formulario/

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mi_base_datos'
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});


conexion.connect((error) => {
    if (error) {
        console.log('Error conectando a la base de datos: ' + error.stack);
    } else {
        console.log('Conectado a la base de datos');
    }
});


app.post('/registro', (req, res) => {
    const { nombre, apellido, telefono, correo, consulta } = req.body;

    console.log('Datos recibidos:', req.body); // Verifica los datos recibidos

    if (!nombre || !apellido || !correo || !telefono || !consulta) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO usuarios (Nombre, Apellido, Telefono, Correo,Consulta) VALUES (?, ?, ?, ? ,?)';
    conexion.query(query, [nombre, apellido, telefono, correo, consulta], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al registrar el usuario' });
        } else {
            res.status(200).json({ message: 'Usuario registrado exitosamente' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server on port http://3.85.51.133/:${port}`);
})
