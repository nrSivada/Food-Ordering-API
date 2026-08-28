const express = require('express');

const router = express.Router();

const {createRestaurant, getRestaurant, getRestaurantById} = require("../controllers/restaurantController");

router.post('/', createRestaurant);

router.get('/', getRestaurant);

router.get('/:id', getRestaurantById);

module.exports = router;
