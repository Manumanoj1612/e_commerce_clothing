import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

function Men() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products/'); // Assuming proxy is set
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Left Sidebar for Filters */}
            <div className="w-[20%] border-r p-4 bg-gray-50">
                <h3 className="text-xl font-bold mb-4">Filters</h3>
                <label className="block mb-2">
                    <input type="checkbox" className="mr-2" /> Price Low to High
                </label>
                <label className="block mb-2">
                    <input type="checkbox" className="mr-2" /> Price High to Low
                </label>
            </div>

            {/* Right Section for Products */}
            <div className="w-[80%] p-6">
                <h2 className="text-2xl font-bold mb-6">Products</h2>
                <div className="flex flex-wrap gap-6">
                    {products
                        .filter(product => product.gender === 'Men')
                        .map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Men;
