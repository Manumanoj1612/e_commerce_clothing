import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cart', {
          withCredentials: true,
        });
        const items = res.data?.products || [];
        setCartItems(
          items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }))
        );
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQty) => {
    try {
      await axios.put(
        `http://localhost:3000/api/cart/${productId}`,
        { quantity: newQty },
        { withCredentials: true }
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const incrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const newQty = item.quantity + 1;
          updateQuantity(id, newQty); // ⬅️ backend sync
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const decrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id && item.quantity > 1) {
          const newQty = item.quantity - 1;
          updateQuantity(id, newQty); // ⬅️ backend sync
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${id}`, {
        withCredentials: true,
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/orders',
        {},
        { withCredentials: true }
      );
      alert('Order placed successfully!');
      setCartItems([]);
      navigate('/orders');
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Order failed. Please try again.');
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex gap-6 items-center"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decrementQty(item._id)}
                    className="px-3 py-1 rounded bg-gray-200"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQty(item._id)}
                    className="px-3 py-1 rounded bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4 space-y-2">
            <div className="text-xl font-bold">Total: ₹{totalAmount}</div>
            <button
              onClick={handlePlaceOrder}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
