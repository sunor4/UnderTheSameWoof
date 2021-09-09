const express = require('express');
const router = express.Router();
const miscController = require('../controllers/misc');

router.get('/readme-itai', miscController.getReadmeItai);

router.get('/readme-or', miscController.getReadmeOr);

router.get('/contact-us', miscController.getContactUs);

router.post('/contact-us', miscController.postContactUs);

router.get('/about-us', miscController.getAboutUs);

module.exports = router;