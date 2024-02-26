const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    categoria: String,
    talla: String,
    precio: Number,
}, {timestamps: true});

const product = mongoose.model('product', productSchema);

module.exports = product