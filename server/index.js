const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db'); // Make sure this connects to MongoDB
const userRoutes = require('./router/auth'); // Auth routes
const productRoutes = require('./router/product.router'); 
const cookieParser = require('cookie-parser');
const orderRoutes = require('./router/order.router');
const cartRouter = require('./router/cart.router');


// Product routes

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', userRoutes); // Handles /register, /login
app.use('/api/products', productRoutes); // Handles /products APIs
app.use('/api/orders', orderRoutes); // Handles /orders APIs
app.use('/api/cart', cartRouter);

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
