const path = require('path');
const fs = require('fs');
//อ่าน ไฟล์ '..'บอกให้ย้อนไปfolder ก่อนหน้า
const filePath = path.join(__dirname, '..', 'data', 'restaurantsinput.json');

function getStoredRestaurants() {

    //ตัวนี้จะได้ไฟล์ text มา
    const fileData = fs.readFileSync(filePath);
    //เราเปลี่ยนเป็น array โดยเปลี่ยนเป็น json
    const storedRestaurants = JSON.parse(fileData);
    return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
    // อะไรก็ได้ : name of function
    mygetStoredRestaurants: getStoredRestaurants,
    mystoredRestaurants: storeRestaurants,
}