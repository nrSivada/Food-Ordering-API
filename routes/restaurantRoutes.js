const express = require('express');

const router = express.Router();

const {createRestaurant} = require("../controllers/restaurantController");

router.post('/', createRestaurant);

module.exports = router;
