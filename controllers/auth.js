const { findUserByEmail } = require("../models/user");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error')
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const remember = req.body.remember;
    const cookieShouldPersist = (remember === "on"); // TODO: set session time accordingly
    
    User.findUserByEmail(email, existingUser => {
        if (!existingUser) {
            req.flash('error', 'Invalid email.');
            res.redirect('/login');
        }
        else {
            bcrypt.compare(password, existingUser.password)
            .then(isValid => {
                console.log("user valid:", isValid);
                if (isValid) {
                    if (!cookieShouldPersist) {
                        req.session.cookie.originalMaxAge = 30 * 60 * 60;
                    }
                    req.session.isLoggedIn = true;
                    req.session.user = true;
                    if (existingUser.isAdmin) {
                        req.session.isAdmin = true;
                    }
                    console.log(`user ${email} : ${password} entered, isAdmin === ${existingUser.isAdmin}`);
                    res.redirect('/');
                }
                else {
                    req.flash('error', 'Invalid password.');
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
      errorMessage: req.flash('error')
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    User.findUserByEmail(email, existingUser => {
        if (existingUser) {
            req.flash('error', 'User already exists.');
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

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};