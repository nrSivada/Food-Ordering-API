const express = require('express');
const { addFood, getRestaurantFood, updateFood, deleteFood, getFoods } = require('../controllers/foodController');

const router = express.Router();

router.post('/restaurants/:restaurantId/foods', addFood);

router.get('/restaurants/:restaurantId/foods', getRestaurantFood);

router.put('/foods/:id', updateFood);

router.delete('/foods/:id', deleteFood);

router.get('/foods', getFoods)

module.exports = router;