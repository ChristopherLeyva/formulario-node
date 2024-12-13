const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(port, () => {
    console.log(`Server on port localhost:${port}`);
})
