const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const restaurantData = require('../utility/restaurant-access-data');

// Middleware to parse URL-encoded data
router.use(express.urlencoded({ extended: false }));

// GET route for recommending a restaurant
router.get('/recommend', function (req, res) {
    res.render('recommend', { mytitle: "Recommend Restaurant" });
});

// POST route for submitting a restaurant recommendation
router.post('/recommend', function (req, res) {
    // Get the submitted restaurant data from the request body
    const newRestaurant = req.body;

    // Generate a unique ID for the restaurant
    newRestaurant.id = uuid.v4();

    // Retrieve the currently stored restaurants
    const storedRestaurants = restaurantData.getStoredRestaurants();

    // Add the new restaurant to the list of stored restaurants
    storedRestaurants.push(newRestaurant);

    // Update the stored restaurant data
    restaurantData.storeRestaurantData(storedRestaurants);

    // Redirect to the confirmation page
    res.redirect('/confirm');
});

// GET route for displaying the confirmation page
router.get('/confirm', function (req, res) {
    res.render('confirm', { mytitle: "Confirm" });
});

// GET route for displaying the list of reviewed restaurants
router.get('/restaurants', function (req, res) {
    // Get the 'order' query parameter from the URL
    let order = req.query.order;
    let nextOrder = 'desc';

    // Validate the 'order' parameter
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    // Determine the 'nextOrder' value for toggling order
    if (order === 'desc') {
        nextOrder = 'asc';
    }

    // Retrieve the stored restaurant data
    const storedRestaurants = restaurantData.getStoredRestaurants();

    // Sort the restaurants based on the selected order
    storedRestaurants.sort(function (resA, resB) {
        if (
            (order === 'asc' && resA.name.toUpperCase() > resB.name.toUpperCase()) ||
            (order === 'desc' && resB.name.toUpperCase() > resA.name.toUpperCase())
        ) {
            return 1;
        }
        return -1;
    });

    // Render the restaurants page with data
    res.render('restaurants', {
        mytitle: "Reviewed Restaurants",
        numberOfRestaurants: storedRestaurants.length,
        storedRestaurants: storedRestaurants,
        nextOrder: nextOrder,
    });
});

// GET route for displaying details of a specific restaurant by ID
router.get('/restaurants/:id', function (req, res) {
    // Get the restaurant ID from the URL parameters
    const restaurantId = req.params.id;

    // Retrieve the stored restaurant data
    const storedRestaurants = restaurantData.getStoredRestaurants();

    // Find the restaurant with the matching ID
    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            // Render the restaurant detail page with the found restaurant data
            return res.render('restaurant-detail', {
                mytitle: "Restaurant Detail",
                restaurant: restaurant,
            });
        }
    }

    // If no matching restaurant is found, render a 404 page
    res.render('404', { mytitle: "Page not found" });
});

// Export the router for use in other parts of the application
module.exports = router;
