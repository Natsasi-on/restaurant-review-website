//require path
const path = require('path');
const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantsRoutes = require('./routes/restaurants');

const app = express();
//tell node that we want to use template engine
//let express know where is file, after dirname is name of views folder
app.set('views', path.join(__dirname, "views"))
//what engine, name of engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
//encode input
app.use(express.urlencoded({ extended: false }));

//use('/') will check every /... in defaultRoutes and if found in defaultRoutes will show according to the route
// if not found will go back to app.js and follow other code
// for app.get('/about') get will find only match word
app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

app.use(function (req, res) {
    res.render('404');
});
app.use(function (error, req, res, next) {
    //nextทำให้ไปต่อไป
    res.render('500');
});
app.listen(3000);