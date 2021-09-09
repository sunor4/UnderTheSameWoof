const fs = require('fs');
const path = require('path');
const usersPath = path.join(path.dirname(require.main.filename), 'data', 'users.json');
const Cart = require('../models/cart');


const getUsersFromFile = (callback) => {
    fs.readFile(usersPath, (err, fileContent) => {
        if (err) {
            callback([]);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.cart = new Cart();
        this.isAdmin = false;
    }

    save() {
        getUsersFromFile((userList) => {
            userList.push(this);
            fs.writeFile(usersPath, JSON.stringify(userList), err => {
                if (err) {
                    console.log(err);
                }
            });
        })
    }
    
    static deleteByEmail (userEmail) {
        getUsersFromFile(users => {
            const updatedUsers = users.filter(user => user.name !== userEmail);
            fs.writeFile(usersPath, JSON.stringify(updatedUsers), err => {
                if (!err) {
                
                }
            })
        });
    }

    static findUserByEmail(email, callback) {
        getUsersFromFile(users => {
            const existingUser = users.find(user => user.email === email);
            callback(existingUser);
        })
    }
}