const product = require('../models/product');
const {getProducts,showProductById, updateProduct} = require('../utils/functions');


const productController = {
    async create (req, res) {
        try {
            const productP = await product.create(req.body)
            res.status(201).redirect(`/dashboard/${productP._id}`)
        } catch (error) {
            console.log(error)
            res.status(400).send("Error al crear el producto.")
           
        }
    },
    async getAllProducts(req, res) {
        try {
            const getTheProducts = await getProducts()
            res.send(getTheProducts)
            
        } catch (error) {
            console.log(error)
            res.status(404).send("No se encontraron productos.")
        }
    },
    async getProductById(req, res) {
        try{
            const _id = req.params.productId
            const getTheProductById = await showProductById(_id)
            res.send(getTheProductById)

        } catch (error) {
            console.log(error)
            res.status(404).send("No se encontró el producto.")
        }
    },
    async putUpdateProduct (req, res) {
        try {
            const _id = req.params.productId
            const newInfo = req.body
            const updatedProduct = await updateProduct(_id, newInfo)
            res.status(200).redirect(`/dashboard/${_id}`)
        } catch (error) {
            console.log(error)
            res.status(400).send("No se pudo actualizar el producto.")
        }
    }
}

module.exports = productController