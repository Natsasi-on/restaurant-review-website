const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { mytitle: "EatWell", });
});

router.get('/about', function (req, res) {
    res.render('about', { mytitle: "About EatWell", });
});

router.get('/login', function (req, res) {
    res.render('login', { mytitle: "Login", });
});

module.exports = router;