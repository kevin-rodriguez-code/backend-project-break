const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/products', productController.getAllProducts)
router.get('/products/:productId', productController.getProductById)
router.post('/dashboard', productController.create);
router.get('/dashboard', productController.getAllProducts);
router.get('/dashboard/:productId', productController.getProductById);
router.put('/dashboard/:productId', productController.putUpdateProduct)

module.exports = router