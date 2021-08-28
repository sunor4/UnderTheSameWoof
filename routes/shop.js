const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const authMiddleware = require('../middleware/auth-mw');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductById);

router.get('/cart', authMiddleware, shopController.getCart);

router.post('/cart', authMiddleware, shopController.postCart);

router.post('/cart-remove-item', authMiddleware, shopController.postCartRemoveItem);

router.get('/orders', authMiddleware, shopController.getOrders);

router.post('/create-order', authMiddleware, shopController.postOrder);

router.get('/checkout', authMiddleware, shopController.getCheckout);

module.exports = router;