const express = require('express');

const router = express.Router();

const {createRestaurant, getRestaurant} = require("../controllers/restaurantController");

router.post('/', createRestaurant);

router.get('/', getRestaurant);

module.exports = router;
