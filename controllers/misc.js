const fs = require('fs');
const path = require('path');
const contactUsFormsPath = path.join(path.dirname(require.main.filename), 'data', 'contact-us.json');

exports.getReadmeItai = (req, res, next) => {
    console.log('get readme itai');
    res.render('misc/readme-itai');
};

exports.getReadmeOr = (req, res, next) => {
    console.log('get readme or');
    res.render('misc/readme-or');
};

exports.getContactUs = (req, res, next) => {
    console.log('get contact us');
    res.render('misc/contact-us', {
        pageTitle: "Contact Us",
        path: '/contact-us',
        message: req.flash('accepted')
    });
};

exports.postContactUs = (req, res, next) => {
    console.log('post contact us');
    const name = req.body.name;
    const country = req.body.country;
    const description = req.body.description;
    saveNewContactUsForm({name, country, description});
    req.flash('accepted', 'Form received. Thanks for contacting us :)');
    res.redirect('/contact-us');
}

const saveNewContactUsForm = (contactForm) => {
    getAllContactForms((formList) => {
        formList.push(contactForm);
        fs.writeFile(contactUsFormsPath, JSON.stringify(formList), err => {
            if (err) {
                console.log(err);
            }
        });
    })
}

const getAllContactForms = (callback) => {
    fs.readFile(contactUsFormsPath, (err, fileContent) => {
        if (err) {
            callback([]);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    });
};

exports.getAboutUs = (req, res, next) => {
    console.log('edit product');
    res.render('misc/about-us', {
        pageTitle: "About Us",
        path: '/about-us'
    });
};