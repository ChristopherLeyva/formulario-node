const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 80;

app.use(cors({
    origin: 'http://3.85.51.133', // Ajusta este valor a tu dominio permitido
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

// Validaciones con expresiones regulares
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras con tildes, ñ y espacios
    return regex.test(nombre);
}

function validarTelefono(telefono) {
    const regex = /^\d{9,15}$/; // Permite solo números (de 9 a 15 dígitos)
    return regex.test(telefono);
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida cualquier correo electrónico estándar
    return regex.test(correo);
}

// Endpoint para registrar usuarios
app.post('/registro', async (req, res) => {
    const { nombre, apellido, telefono, correo, consulta } = req.body;

    console.log('Datos recibidos:', req.body); // Verifica los datos recibidos

    // Validaciones
    if (!nombre || !validarNombre(nombre)) {
        return res.status(400).json({ message: 'Nombre inválido. Solo se permiten letras, tildes, ñ y espacios.' });
    }
    if (!apellido || !validarNombre(apellido)) {
        return res.status(400).json({ message: 'Apellido inválido. Solo se permiten letras, tildes, ñ y espacios.' });
    }
    if (!telefono || !validarTelefono(telefono)) {
        return res.status(400).json({ message: 'Teléfono inválido. Solo se permiten números entre 9 y 15 dígitos.' });
    }
    if (!correo || !validarCorreo(correo)) {
        return res.status(400).json({ message: 'Correo electrónico inválido.' });
    }
    if (!consulta) {
        return res.status(400).json({ message: 'El campo consulta es obligatorio.' });
    }

    try {
        const conexion = await connectDB();
        const query = 'INSERT INTO usuarios (Nombre, Apellido, Telefono, Correo, Consulta) VALUES (?, ?, ?, ?, ?)';
        const [result] = await conexion.execute(query, [nombre, apellido, telefono, correo, consulta]);
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://3.85.51.133:${port}`);
});

app.listen(port, () => {
    console.log(`Server on port http://3.85.51.133/:${port}`);
});
