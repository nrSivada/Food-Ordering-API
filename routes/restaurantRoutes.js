const express = require('express');

const router = express.Router();

const {createRestaurant, getRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant} = require("../controllers/restaurantController");
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, createRestaurant);

router.get('/', getRestaurant);

router.get('/:id', getRestaurantById);

router.put('/:id',authMiddleware, adminMiddleware, updateRestaurant);

router.delete('/:id', authMiddleware, adminMiddleware, deleteRestaurant);


module.exports = router;
