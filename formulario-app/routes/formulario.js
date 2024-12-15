
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const router = express.Router();

// Conexión a MySQL usando variables de entorno
const db = mysql.createConnection({
    host: 'form.cn412v8a1jvl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'formulario90',
    database: 'formulario_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta GET para mostrar el formulario
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Ruta POST para guardar datos
router.post('/', (req, res) => {
    const { nombres, apellidos, edad, correo, mensaje } = req.body;

    if (!nombres || !apellidos || !edad || !correo || !mensaje) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const sql = 'INSERT INTO usuarios (nombres, apellidos, edad, correo, mensaje) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombres, apellidos, edad, correo, mensaje], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar los datos');
        }
        res.send('Datos guardados correctamente');
    });
});

module.exports = router;
