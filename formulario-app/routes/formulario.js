const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'form.cn412v8a1jvl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'form.cn412v8a1jvl.us-east-1.rds.amazonaws.com',
    database: 'form'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta POST para guardar datos
router.post('/', (req, res) => {
    const { nombres, apellidos, edad, correo, mensaje } = req.body;
    const sql = 'INSERT INTO usuarios (nombres, apellidos, edad, correo, mensaje) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombres, apellidos, edad, correo, mensaje], (err) => {
        if (err) throw err;
        res.send('Datos guardados correctamente');
    });
});

module.exports = router;
