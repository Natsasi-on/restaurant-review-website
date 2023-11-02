const express = require('express');
const path = require('path');


const defaultRoutes = require('./routes/defaults');
const restaurantsRoutes = require('./routes/restaurants');

const app = express();

app.use(express.static('public'));

app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs');



app.use(function (error, req, res, next) {
    res.render('500', { mytitle: "Something went wrong!", });
});

app.listen(3000);