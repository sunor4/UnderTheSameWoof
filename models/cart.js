const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const cartPath = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch previous cart
        fs.readFile(cartPath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Handle duplicate items - if item exists, increment quantity
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, quantity : 1};
                cart.products = [...cart.products, updatedProduct];
            }

            // Update total cost
            cart.totalPrice += +productPrice;

            // Save cart
            fs.writeFile(cartPath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static removeProduct(productId, productPrice) {
        fs.readFile(cartPath, (err, fileContent) => {
            if (err) {
                return;
            }
            
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === productId);
            if (!product) {
                return;
            }
            const productQuantity = product.quantity;
            
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== productId);
            updatedCart.totalPrice -= (productPrice * productQuantity);

            fs.writeFile(cartPath, JSON.stringify(updatedCart), error => {
                console.log(error);
            });
        })
    }

    static getProducts(callback) {
        fs.readFile(cartPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (!err) {
                callback(cart);
            }
            else {
                callback(null);
            }
        })
    }
}