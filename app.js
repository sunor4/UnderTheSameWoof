const express = require('express');
const { send } = require('process');
const path = require('path');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const miscRoutes = require('./routes/misc');
const errorController = require('./controllers/error');

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views'); // not necessary as our views folder is already set up.

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
    {
        secret: 'secret', 
        resave: false, 
        saveUninitialized: false
    })
);

app.use(csrfProtection);

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(authRoutes);
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(miscRoutes);
app.use(errorController.get404);

app.listen(3000);