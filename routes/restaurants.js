const express = require('express');
const uuid = require('uuid');

const resData = require('../utility/restaurant-access-data');
const router = express.Router();



router.get('/restaurants', function (req, res) {
    let order = req.query.order;
    let nextOrder = 'desc';
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }
    if (order === 'desc') {
        nextOrder = 'asc';
    }
    const storedRestaurants = resData.mygetStoredRestaurants();

    storedRestaurants.sort(function (restaurantA, restaurantB) {
        if ((order === 'asc' && restaurantA.name > restaurantB.name) || (order === 'desc' && restaurantB.name > restaurantA.name)) {
            return 1 
        }
        return -1 
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
   
    const restaurant = req.body;
    
    restaurant.id = uuid.v4();
  
    const storedRestaurants = resData.mygetStoredRestaurants();

    storedRestaurants.push(restaurant);
    
    resData.mystoredRestaurants(storedRestaurants);
 
    res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});

router.get('/login', function (req, res) {
    res.render('login');
});


module.exports = router;
