const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurantsinput.json');

function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath);
  
    const storedRestaurants = JSON.parse(fileData);
    return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
    mygetStoredRestaurants: getStoredRestaurants,
    mystoredRestaurants: storeRestaurants,
}
