const Cart = require('../model/cart');
const Product = require('../model/product');

// Get user's cart
const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        res.json(cart || { user: req.user._id, products: [] });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
    }
};

// Add or update product in cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid product or quantity' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, products: [] });
        }

        const existingItem = cart.products.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        cart.updatedAt = new Date();
        await cart.save();

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update cart', error: err.message });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => item.product.toString() !== req.params.productId);
        cart.updatedAt = new Date();
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove product from cart', error: err.message });
    }
};

// Update product quantity in cart
const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.products.find(p => p.product.toString() === productId);

        if (item) {
            item.quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Product not in cart' });
        }

        await cart.save();

        res.json({ message: 'Quantity updated', cart });
    } catch (err) {
        console.error('Update quantity error:', err);
        res.status(500).json({ message: 'Failed to update cart', error: err.message });
    }
};

module.exports = {
    getUserCart,
    addToCart,
    removeFromCart,
    updateCartQuantity
}; 