const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/dashboard/new', productController.showProductForm);
router.post('/dashboard', productController.create);
router.get('/dashboard/:productId', productController.getProductById);
router.put('/dashboard/:productId', productController.putUpdateProduct);
router.get('/dashboard', productController.getAllProducts);
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.delete('/dashboard/:productId/delete', productController.productDelete);

module.exports = router