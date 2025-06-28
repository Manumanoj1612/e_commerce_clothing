const Product = require("../model/product");

class ProductController {
    // Get all products
    static async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Get single product by ID
    static async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Create new product
    static async createProduct(req, res) {
        try {
            const product = new Product(req.body);
            const createdProduct = await product.save();
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(400).json({ message: "Invalid product data", error: error.message });
        }
    }

    // Update product
    static async updateProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: "Error updating product", error: error.message });
        }
    }

    // Delete product
    static async deleteProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: "Product removed" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

module.exports = ProductController; 