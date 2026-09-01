const express = require('express');
const { addFood, getRestaurantFood, updateFood, deleteFood, getFoods } = require('../controllers/foodController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/restaurants/:restaurantId/foods', authMiddleware, adminMiddleware, addFood);

router.get('/restaurants/:restaurantId/foods', getRestaurantFood);

router.put('/foods/:id', updateFood);

router.delete('/foods/:id', deleteFood);

router.get('/foods', getFoods)

module.exports = router;