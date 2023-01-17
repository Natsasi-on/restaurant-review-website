const express = require('express');
const uuid = require('uuid');

const resData = require('../utility/restaurant-access-data');
const router = express.Router();

// to open html file in node
// app.get('/restaurants', function (req, res) {
//     // create path 
//     const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
//     res.sendFile(htmlFilePath);
// });

// when use ejs 
router.get('/restaurants', function (req, res) {
    //quary change display on frontend
    let order = req.query.order;
    let nextOrder = 'desc';
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }
    if (order === 'desc') {
        nextOrder = 'asc';
    }
    const storedRestaurants = resData.mygetStoredRestaurants();

    //sorting for normal
    // storedRestaurants.sort();
    //sorting for this situation
    storedRestaurants.sort(function (restaurantA, restaurantB) {
        if ((order === 'asc' && restaurantA.name > restaurantB.name) || (order === 'desc' && restaurantB.name > restaurantA.name)) {
            return 1 //ไม่เปลี่ยน ตำเเหน่ง
        }
        return -1 // เปลี่ยนตำเเหน่ง
    });

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: nextOrder,
    });
});

router.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;

    const storedRestaurants = resData.mygetStoredRestaurants();
    //เมื่อได้ข้อมูลมาต้องมาหาid ที่ตรงกันด้วย
    for (const rest of storedRestaurants) {
        if (rest.id === restaurantId) {
            return res.render('restaurant-detail', {
                restaurant: rest,
            });
        }
    }
    res.render('404');
});

router.get('/recommend', function (req, res) {
    res.render('recommend');
});

router.post('/recommend', function (req, res) {
    // get input from user 
    const restaurant = req.body;
    //add id that auto create v4 รูปเเบบของid ที่auto เช่น 412sdf
    restaurant.id = uuid.v4();
    // call function from utility folder
    const storedRestaurants = resData.mygetStoredRestaurants();

    storedRestaurants.push(restaurant);
    //cals another function from utility folder
    resData.mystoredRestaurants(storedRestaurants);
    //หลังเก็บข้อมูลให้เเสดง
    res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});

router.get('/login', function (req, res) {
    res.render('login');
});

//ส่งไปapp.js
module.exports = router;