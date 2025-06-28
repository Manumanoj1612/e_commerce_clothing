import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images?.[0] || '');
      } catch (err) {
        console.error('Failed to load product details:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/cart',
        {
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true, // ✅ Include cookie (JWT token)
        }
      );
      alert('Product added to cart (MongoDB)');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart');
    }
  };

  if (!product) {
    return <div className="p-4 text-gray-700 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-cream-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                  mainImage === img ? 'border-gray-600' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div>
            <img
              src={mainImage}
              alt={product.name}
              className="w-[500px] h-[600px] object-cover rounded-xl shadow-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 space-y-6 text-gray-700 font-sans">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-gray-800">{product.brand}</h2>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {product.rating && (
            <div className="text-md text-yellow-500 flex items-center">
              ⭐ {product.rating} ({product.reviews} Reviews)
            </div>
          )}

          <div className="text-3xl font-bold text-gray-900 flex items-center gap-4">
            ₹ {product.price}
            {product.originalPrice && (
              <>
                <span className="line-through text-gray-500 text-xl">₹ {product.originalPrice}</span>
                <span className="text-red-600 text-xl">
                  ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                </span>
              </>
            )}
          </div>

          <div className="text-green-700 text-md">Inclusive of all taxes</div>

          <p className="text-lg leading-relaxed text-gray-700">{product.description}</p>

          {product.sizes && (
            <div>
              <div className="mb-2 text-md font-medium">Select Size:</div>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-full text-gray-800 hover:border-gray-700"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
            >
              Add to Bag
            </button>
            <button className="border border-gray-400 px-6 py-3 rounded-lg text-lg font-semibold text-gray-700">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
