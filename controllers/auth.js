exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    const email = req.body.email;
    const password = req.body.password;
    console.log(`user ${email} : ${password} entered`);
    res.redirect('/');
};