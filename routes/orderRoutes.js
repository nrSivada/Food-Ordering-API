const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder } = require("../controllers/orderController");

router.post('/', authMiddleware, placeOrder);

module.exports = router;