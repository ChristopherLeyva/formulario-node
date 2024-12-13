const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 80;

app.use(cors({
    origin: '*', // Puedes ajustar esto según sea necesario
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.static('public'));

async function connectDB() {
    try {
        const conexion = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'mi_base_datos'
        });
        console.log('Conectado a la base de datos');
        return conexion;
    } catch (error) {
        console.error('Error conectando a la base de datos: ' + error.stack);
    }
}

function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
}

function validarTelefono(telefono) {
    const regex = /^\d{9,15}$/;
    return regex.test(telefono);
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

app.post('/registro', async (req, res) => {
    const { nombre, apellido, telefono, correo, consulta } = req.body;

    if (!nombre || !validarNombre(nombre)) {
        return res.status(400).json({ message: 'Nombre inválido' });
    }
    if (!apellido || !validarNombre(apellido)) {
        return res.status(400).json({ message: 'Apellido inválido' });
    }
    if (!telefono || !validarTelefono(telefono)) {
        return res.status(400).json({ message: 'Teléfono inválido' });
    }
    if (!correo || !validarCorreo(correo)) {
        return res.status(400).json({ message: 'Correo electrónico inválido' });
    }
    if (!consulta) {
        return res.status(400).json({ message: 'Consulta es obligatoria' });
    }

    try {
        const conexion = await connectDB();
        const query = 'INSERT INTO usuarios (Nombre, Apellido, Telefono, Correo, Consulta) VALUES (?, ?, ?, ?, ?)';
        await conexion.execute(query, [nombre, apellido, telefono, correo, consulta]);
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://54.165.167.0:${port}`);
});

app.listen(port, () => {
    console.log(`Server on port http://54.165.167.0/:${port}`);
});
