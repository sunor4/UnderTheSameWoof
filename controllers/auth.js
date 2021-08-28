const { findUserByEmail } = require("../models/user");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    /** TODO:
     * 1. Store new sessions in file db so we'll be able to track them (maybe there's a built-in way to do this).
     */

    const email = req.body.email;
    const password = req.body.password;
    User.findUserByEmail(email, existingUser => {
        if (!existingUser) {
            res.redirect('/');
        }
        else {
            bcrypt.compare(password, existingUser.password)
            .then(isValid => {
                console.log(isValid);
                if (isValid) {
                    req.session.isLoggedIn = true;
                    req.session.user = true;
                    console.log(`user ${email} : ${password} entered`);
                    res.redirect('/');
                }
                else {
                    res.redirect('/login');
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/login');
            })
        }
    })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(`user logged out`);
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    User.findUserByEmail(email, existingUser => {
        if (existingUser) {
            res.redirect('/signup');
        }
        else {
            bcrypt.hash(password, 12)
            .then (hashedPassword => {
                const newUser = new User(email, hashedPassword);
                return newUser.save();
            })
            .then(result => {
                res.redirect('/login');
            })
            .catch(err => console.log(err));
        }
    })
};

handleUserExists = function () {
    
}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};