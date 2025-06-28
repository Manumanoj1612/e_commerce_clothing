import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/orders', {
                    withCredentials: true,
                });
                setOrders(res.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'bg-yellow-200 text-yellow-800';
            case 'shipped':
                return 'bg-blue-200 text-blue-800';
            case 'delivered':
                return 'bg-green-200 text-green-800';
            case 'cancelled':
                return 'bg-red-200 text-red-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };


    const cancelOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:3000/api/orders/${orderId}/cancel`, {}, {
                withCredentials: true
            });
            // Update the state locally
            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId ? { ...order, status: 'Cancelled' } : order
                )
            );
        } catch (err) {
            console.error('Failed to cancel order:', err);
            alert('Failed to cancel order. Please try again.');
        }
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row justify-between gap-4"
                    >
                        {/* LEFT: Order & Products */}
                        <div className="flex-1 space-y-2">
                            <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                            <p className="text-sm text-gray-500">Total Amount: ₹{order.totalAmount}</p>

                            {order.products.map((item, index) =>
                                item.product ? (
                                    <div key={index} className="flex items-center gap-4 border-b pb-3">
                                        <img
                                            src={item.product.images?.[0]}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">
                                                ₹{item.product.price} × {item.quantity}
                                            </p>
                                        </div>


                                    </div>
                                ) : (
                                    <div key={index} className="text-red-500">
                                        Product no longer exists
                                    </div>
                                )
                            )}
                        </div>

                        {/* RIGHT: Order Status */}
                        <div className="md:text-right flex-shrink-0 flex flex-col items-end gap-5" >
                            
                            <div className='flex flex-col items-end'>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                    order.status
                                )}`}
                            >
                                {order.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                            </div>
                            <div>{order.status === 'Processing' && (
                                <button
                                    onClick={() => cancelOrder(order._id)}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Cancel Order
                                </button>
                            )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;
