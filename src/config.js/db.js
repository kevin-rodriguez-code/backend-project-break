const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada')
    }catch{
        console.error('No se pudo conectar a la base de datos')
    }
};

module.exports = dbConnection