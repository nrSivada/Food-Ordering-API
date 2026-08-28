const express = require('express');

const router = express.Router();

const {createRestaurant, getRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant} = require("../controllers/restaurantController");

router.post('/', createRestaurant);

router.get('/', getRestaurant);

router.get('/:id', getRestaurantById);

router.put('/:id', updateRestaurant);

router.delete('/:id', deleteRestaurant);

module.exports = router;
