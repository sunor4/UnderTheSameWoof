exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    /** TODO:
     * 1. Implement actual authentication of user.
     * 2. Implement file db of users that are allowed to log in.
     * 3. Store new sessions in file db so we'll be able to track them (maybe there's a built-in way to do this).
     */
    
    req.session.isLoggedIn = true;

    const email = req.body.email;
    const password = req.body.password;

    console.log(`user ${email} : ${password} entered`);

    res.redirect('/');
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