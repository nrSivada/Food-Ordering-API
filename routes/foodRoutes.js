const express = require('express');
const { addFood, getRestaurantFood, updateFood } = require('../controllers/foodController');

const router = express.Router();

router.post('/restaurants/:restaurantId/foods', addFood);

router.get('/restaurants/:restaurantId/foods', getRestaurantFood);

router.put('/foods/:id', updateFood)

module.exports = router;