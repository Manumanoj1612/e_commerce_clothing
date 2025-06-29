const Order = require('../model/order');
const Cart = require('../model/cart');

// Place an order
const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get products from backend cart
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let totalAmount = 0;
        const orderProducts = cart.products.map(item => {
            totalAmount += item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity,
            };
        });

        const newOrder = await Order.create({
            user: userId,
            products: orderProducts,
            totalAmount,
        });

        // Clear the cart
        cart.products = [];
        await cart.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
};

// Get logged-in user's orders
const getUserOrders = async (req, res) => {
    try {
        const { _id: userId, role } = req.user;

        const filter = role === 'admin' ? {} : { user: userId };
        const orders = await Order.find(filter)
            .populate({ path: 'user', select: 'username' })
            .populate('products.product')
            .sort({ createdAt: -1 }); // newest first
        res.status(200).json(orders);
    } catch (err) {
        console.error('Fetch orders error:', err);
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

// Cancel an order
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status !== 'Processing') {
            return res.status(400).json({ message: 'Only processing orders can be cancelled' });
        }

        order.status = 'Cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (err) {
        console.error('Cancel order error:', err);
        res.status(500).json({ message: 'Failed to cancel order' });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOne({ _id: req.params.id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
        console.error('Update order error:', err);
        res.status(500).json({ message: 'Failed to update order', error: err.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const result = await Order.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Delete order error:', err);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};

module.exports = {
    placeOrder,
    getUserOrders,
    cancelOrder,
    updateOrderStatus,
    deleteOrder
}; 