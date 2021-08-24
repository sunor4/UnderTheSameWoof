const express = require('express');
const { send } = require('process');
const path = require('path');
const session = require('express-session');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // not necessary as our views folder is already set up.

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {
        secret: 'secret', 
        resave: false, 
        saveUninitialized: false,
    })
);

app.use(authRoutes);
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);