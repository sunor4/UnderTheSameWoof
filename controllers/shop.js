const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: "My Shop",
            path: '/products',
            hasProducts: products.length > 0,
            isAuthenticated: req.session.isLoggedIn
        });
    });
};

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.getProductById(productId, product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: product.title,
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: "Shop",
            path: '/',
            isAuthenticated: req.session.isLoggedIn
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, quantity: cartProductData.quantity});
                }
            }
            
            res.render('shop/cart', {
                pageTitle: "Your Cart",
                path: '/cart',
                products: cartProducts,
                isAuthenticated: req.session.isLoggedIn
            });
        });
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path: '/checkout',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: "Your Orders",
        path: '/orders',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postCartRemoveItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
};