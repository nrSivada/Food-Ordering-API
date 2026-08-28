const express = require('express');
const { addFood } = require('../controllers/foodController');

const router = express.Router();

router.post('/restaurants/:restaurantId/foods', addFood);

module.exports = router;