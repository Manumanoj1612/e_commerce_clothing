// AdminProduct.jsx
import React, { useState, useEffect } from 'react';
import AddProduct from './Addproduct';
import EditProduct from './EditProduct';
import Modal from '@mui/material/Modal';
import axios from 'axios';

function AdminProduct() {
    const [open, setOpen] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchUserAndProducts = async () => {
        try {
            const meResponse = await axios.get('http://localhost:3000/api/me', {
                withCredentials: true,
            });

            const user = meResponse.data.user;
            setUserId(user._id);

            const productsResponse = await axios.get('http://localhost:3000/api/products/');
            setProducts(productsResponse.data);
        } catch (error) {
            console.error('Error fetching user or products:', error);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/products/${productId}`, {
                withCredentials: true
            });

            setProducts(products.filter(p => p._id !== productId));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    useEffect(() => {
        fetchUserAndProducts();
    }, []);

    const filteredProducts = products
        .filter(product => String(product.createdBy) === String(userId))
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="pl-30 pr-30 pt-15 pb-20">
            <h1 className="text-3xl font-bold">All products</h1>
            <p className="text-gray-500 mb-6">View and manage all products</p>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products"
                    className="w-full p-2 border rounded-lg bg-gray-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex justify-end gap-2 mb-4">
                <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">Import</button>
                <button onClick={handleOpen} className="text-black">Add Product</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddProduct />
                </Modal>
            </div>

            <div className="overflow-x-auto rounded-3xl">
                <table className="min-w-full bg-white rounded-4xl">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Inventory</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <img src={product.images} alt={product.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.price}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => setEditProductId(product._id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Side panel for editing */}
            {editProductId && (
                <EditProduct
                    productId={editProductId}
                    onClose={() => setEditProductId(null)}
                    refreshProducts={fetchUserAndProducts}
                />
            )}
        </div>
    );
}

export default AdminProduct;
