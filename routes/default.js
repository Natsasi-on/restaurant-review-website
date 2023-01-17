const express = require('express');
const router = express.Router();

router.get('/index', function (req, res) {
    res.render('index');
});

router.get('/about', function (req, res) {
    res.render('about');
});

//ส่งไปapp.js
module.exports = router;

