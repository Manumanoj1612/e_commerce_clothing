const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, cancelOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// POST /api/orders - Place an order
router.post('/', verifyToken, placeOrder);

// GET /api/orders - Get logged-in user's orders
router.get('/', verifyToken, getUserOrders);

// PUT /api/orders/:id/cancel - Cancel an order
router.put('/:id/cancel', verifyToken, cancelOrder);

// PUT /api/orders/:id - Update order status
router.put('/:id', verifyToken, updateOrderStatus);

// DELETE /api/orders/:id - Delete an order
router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;
