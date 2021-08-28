const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const authMiddleware = require('../middleware/auth-mw');

const router = express.Router();

const adminController = require('../controllers/admin');

// we don't execute 'getAddProduct', therefore we don't write 'getAddProduct()', but rather just reference the function.
router.get('/add-product', authMiddleware, adminController.getAddProduct);

// app.use will be used for both get and post requests, therfore if we want only one of the two, we use .get or .post
router.post('/add-product', authMiddleware, adminController.postAddProduct);

router.get('/products', authMiddleware, adminController.getProducts);

router.get('/edit-product/:productId', authMiddleware, adminController.getEditProduct);

router.post('/edit-product', authMiddleware, adminController.postEditProduct);

router.post('/delete-product', authMiddleware, adminController.postDeleteProduct);



exports.routes = router;