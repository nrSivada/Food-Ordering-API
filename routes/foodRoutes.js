const express = require('express');
const { addFood, getRestaurantFood } = require('../controllers/foodController');

const router = express.Router();

router.post('/restaurants/:restaurantId/foods', addFood);

router.get('/restaurants/:restaurantId/foods', getRestaurantFood);

module.exports = router;