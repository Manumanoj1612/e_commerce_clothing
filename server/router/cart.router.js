const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

// GET /api/cart - Get user's cart
router.get('/', verifyToken, CartController.getUserCart);

// POST /api/cart - Add or update product in cart
router.post('/', verifyToken, CartController.addToCart);

// DELETE /api/cart/:productId - Remove product from cart
router.delete('/:productId', verifyToken, CartController.removeFromCart);

// PUT /api/cart/:productId - Update product quantity
router.put('/:productId', verifyToken, CartController.updateCartQuantity);

module.exports = router;
