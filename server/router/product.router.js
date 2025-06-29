// routes/productRoutes.js

const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
router.get("/", getAllProducts);

// @desc    Get single product by ID
// @route   GET /api/products/:id
router.get("/:id", getProductById);

// @desc    Create new product
// @route   POST /api/products
router.post("/", createProduct);

// @desc    Update product
// @route   PUT /api/products/:id
router.put("/:id", updateProduct);

// @desc    Delete product
// @route   DELETE /api/products/:id
router.delete("/:id", deleteProduct);

module.exports = router;
