// Import necessary modules
const path = require('path');
const fs = require('fs');

// Define the file path for the JSON data
const filePath = path.join(__dirname, '..', 'data', 'restaurantsinput.json');

// Function to retrieve stored restaurant data from the JSON file
function getStoredRestaurants() {
    // Read the content of the JSON file
    const fileData = fs.readFileSync(filePath);

    // Parse the JSON data into an array of restaurants
    const storedRestaurants = JSON.parse(fileData);

    // Return the array of stored restaurants
    return storedRestaurants;
}

// Function to store restaurant data in the JSON file
function storeRestaurantData(storableRestaurants) {
    // Serialize the array of restaurants into JSON format
    const jsonData = JSON.stringify(storableRestaurants);

    // Write the JSON data back to the file, overwriting the existing content
    fs.writeFileSync(filePath, jsonData);
}

// Export the functions for use in other parts of the application
module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurantData: storeRestaurantData
}
