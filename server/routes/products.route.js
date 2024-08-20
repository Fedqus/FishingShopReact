const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const userMiddleware = require('../middleware/user.middleware');
const roleMiddleware = require('../middleware/role.middleware');

//for user
router.get('/all', userMiddleware, productController.getProducts);
router.get('/:category', userMiddleware, productController.getProductsByCategory);

router.get('/sort', userMiddleware, productController.sortProducts); // /products/sort?field=price&sort=asc
router.get('/search', productController.searchProducts); // /products/search?query=fish-rod

//for ADMIN
router.post('', roleMiddleware(['ADMIN']), productController.createProduct);
router.patch('', roleMiddleware(['ADMIN']), productController.updateProduct);
router.delete('', roleMiddleware(['ADMIN']), productController.deleteProduct);

module.exports = router;