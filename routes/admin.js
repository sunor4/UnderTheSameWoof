const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const authMiddleware = require('../middleware/auth-mw');
const adminMiddleware = require('../middleware/admin-mw');

const router = express.Router();

const adminController = require('../controllers/admin');

// we don't execute 'getAddProduct', therefore we don't write 'getAddProduct()', but rather just reference the function.
router.get('/add-product', [authMiddleware, adminMiddleware], adminController.getAddProduct);

// app.use will be used for both get and post requests, therfore if we want only one of the two, we use .get or .post
router.post('/add-product', [authMiddleware, adminMiddleware], adminController.postAddProduct);

router.get('/products', [authMiddleware, adminMiddleware], adminController.getProducts);

router.get('/edit-product/:productId', [authMiddleware, adminMiddleware], adminController.getEditProduct);

router.post('/edit-product', [authMiddleware, adminMiddleware], adminController.postEditProduct);

router.post('/delete-product', [authMiddleware, adminMiddleware], adminController.postDeleteProduct);



exports.routes = router;