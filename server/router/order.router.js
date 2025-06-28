const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// POST /api/orders - Place an order
router.post('/', verifyToken, OrderController.placeOrder);

// GET /api/orders - Get logged-in user's orders
router.get('/', verifyToken, OrderController.getUserOrders);

// PUT /api/orders/:id/cancel - Cancel an order
router.put('/:id/cancel', verifyToken, OrderController.cancelOrder);

// PUT /api/orders/:id - Update order status
router.put('/:id', verifyToken, OrderController.updateOrderStatus);

// DELETE /api/orders/:id - Delete an order
router.delete('/:id', verifyToken, OrderController.deleteOrder);

module.exports = router;
