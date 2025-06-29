const express = require('express');
const router = express.Router();
const { getUserCart, addToCart, removeFromCart, updateCartQuantity } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

// GET /api/cart - Get user's cart
router.get('/', verifyToken, getUserCart);

// POST /api/cart - Add or update product in cart
router.post('/', verifyToken, addToCart);

// DELETE /api/cart/:productId - Remove product from cart
router.delete('/:productId', verifyToken, removeFromCart);

// PUT /api/cart/:productId - Update product quantity
router.put('/:productId', verifyToken, updateCartQuantity);

module.exports = router;
