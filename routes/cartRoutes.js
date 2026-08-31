const express = require('express');
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, addToCart);

router.get('/', authMiddleware, getCart);

router.put('/:foodId', authMiddleware, updateCartItem);

router.delete('/:foodId', authMiddleware, removeFromCart);

module.exports = router;