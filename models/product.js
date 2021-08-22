const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const productsPath = path.join(path.dirname(require.main.filename), 'data', 'products.json');
const Cart = require('./cart');


const getProductsFromFile = (callback) => {
    fs.readFile(productsPath, (err, fileContent) => {
        if (err) {
            callback([]);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price=19.99, description='Pet stuff') {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            let jsonToWrite = products;
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                jsonToWrite = updatedProducts;
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
            }
            fs.writeFile(productsPath, JSON.stringify(jsonToWrite), err => {
                if (err) {
                    console.log(err);
                }
            });
        })
    }

    static deleteById (productId) {
        getProductsFromFile(products => {
            const productToDelete = products.find(prod => prod.id === productId);
            const productPrice = productToDelete.price;

            const updatedProducts = products.filter(prod => prod.id !== productId);
            fs.writeFile(productsPath, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(productId, productPrice);
                }
            })
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static getProductById(productId, callback) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === productId);
            callback(product);
        });
    }
}