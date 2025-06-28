import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-60 border rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        {/* Product Image */}
        <div className="w-full h-72 bg-gray-100">
          <img 
            src={hovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition duration-300" 
          />
        </div>

        {/* Wishlist Icon */}
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <Heart className="w-5 h-5 text-gray-600" />
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-md font-semibold">{product.brand}</h3>
          <p className="text-sm text-gray-500 mb-1">{product.name}</p>
          <div className="mt-1">
            <span className="font-bold text-gray-800">₹ {product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-gray-400 ml-2">₹ {product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span className="text-red-500 ml-2">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
