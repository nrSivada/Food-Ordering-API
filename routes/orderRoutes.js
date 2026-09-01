const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders, getOrderById, cancelOrder } = require("../controllers/orderController");

router.post('/', authMiddleware, placeOrder);

router.get('/', authMiddleware, getMyOrders);

router.get('/:id', authMiddleware, getOrderById);

router.patch('/:id/cancel', authMiddleware, cancelOrder);

module.exports = router;