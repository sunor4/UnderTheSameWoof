const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const adminController = require('../controllers/admin');

// we don't execute 'getAddProduct', therefore we don't write 'getAddProduct()', but rather just reference the function.
router.get('/add-product', adminController.getAddProduct);

// app.use will be used for both get and post requests, therfore if we want only one of the two, we use .get or .post
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);



exports.routes = router;