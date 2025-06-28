import React, { useState, useEffect } from 'react';
import axios from 'axios';

const statusActions = {
  'Processing': 'Mark as shipped',
  'Shipped': 'Mark as delivered',
  'Delivered': '',
  'Cancelled': '',
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/orders', {
          withCredentials: true,
        });
        // console.log(res.data);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async (orderId, currentStatus) => {
    const statusFlow = {
      'Processing': 'Shipped',
      'Shipped': 'Delivered'
    };
    const nextStatus = statusFlow[currentStatus];
    if (!nextStatus) return;

    try {
      await axios.put(
        `http://localhost:3000/api/orders/${orderId}`,
        { status: nextStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      <input
        type="text"
        placeholder="Search by order ID"
        className="w-full mb-4 p-3 rounded bg-gray-100 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Order #</th>
              <th className="p-3">User</th>
              <th className="p-3">Products</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-blue-600">{order._id}</td>
                <td className="p-3">{order.user?.username || 'User'}</td>
                <td className="p-3 text-sm">
                  <ul className="space-y-1">
                    {order.products.map((item, index) => (
                      <li key={index}>
                        {item.product?.name || 'Deleted Product'} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">₹{order.totalAmount?.toFixed(2)}</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-700'
                        : ''
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-blue-500 space-x-2">
                  {statusActions[order.status] && (
                    <button
                      onClick={() => handleStatusUpdate(order._id, order.status)}
                      className="hover:underline"
                    >
                      {statusActions[order.status]}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
