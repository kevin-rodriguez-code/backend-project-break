const express = require('express');
const dbConnection = require('./config.js/db');
const app = express();
const router = require('./routes/productRoutes')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

dbConnection();

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log(`El servidor está escuchando en el puerto http://localhost:${process.env.PORT}`)
})