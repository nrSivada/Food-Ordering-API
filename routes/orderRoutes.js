const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders, getOrderById, cancelOrder, updateOrderStatus } = require("../controllers/orderController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post('/', authMiddleware, placeOrder);

router.get('/', authMiddleware, getMyOrders);

router.get('/:id', authMiddleware, getOrderById);

router.patch('/:id/cancel', authMiddleware, cancelOrder);

router.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);





module.exports = router;