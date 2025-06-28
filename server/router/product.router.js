// routes/productRoutes.js

const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
router.get("/", ProductController.getAllProducts);

// @desc    Get single product by ID
// @route   GET /api/products/:id
router.get("/:id", ProductController.getProductById);

// @desc    Create new product
// @route   POST /api/products
router.post("/", ProductController.createProduct);

// @desc    Update product
// @route   PUT /api/products/:id
router.put("/:id", ProductController.updateProduct);

// @desc    Delete product
// @route   DELETE /api/products/:id
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
