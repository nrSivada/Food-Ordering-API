const express = require('express');
const { addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, addToCart);

module.exports = router;