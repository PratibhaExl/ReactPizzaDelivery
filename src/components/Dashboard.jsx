
import React, { useEffect, useState } from 'react';
import { getAllUserOrders,getOrdersByUser, updateOrderStatus } from '../services/OrderService';
import { isAdmin, isLoggedIn, getUserDataFromToken } from '../services/AuthService'; // Assuming you have this function
import './MyOrders.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
    const user = getUserDataFromToken();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllUserOrders({ email: user.email, role: user.role });
                setOrders(response?.data?.orders)
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user.email, user.role]);

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await updateOrderStatus({ orderId, status });
            setOrders(orders.map(order => order._id === orderId ? { ...order, orderStatus:status } : order));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    
    
    return (
       
        <div className="orders-container">
            <h2> {user.role === 'admin'?'Users Order List':`Welcome ${user.fullname}`} </h2>
            { orders != undefined && orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    { orders != undefined &&  orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <h3>Order ID: {order._id}</h3>
                            <p className={`order-status ${order.status}`}>Order Status: {order.orderStatus}</p>
                            <p>Total Price: <span className="total-price">${order.totalPrice}</span></p>
                            <div className="cart-items">
                                {order.cartItems.map((item, index) => (
                                    <div className="cart-item" key={index}>
                                        <img src={item.imagePath} alt={item.name} className="item-image" />
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>Category: {item.category}</p>
                                            <p>Price: ${item.price}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {user.role === 'admin' && (
                                <div className="order-actions">
                                    
                                    <button 
                                        disabled={order.orderStatus == 'denied'?true:false}
                                        onClick={() => handleUpdateStatus(order._id, 'denied')} 
                                        className="deny-button">
                                        Deny
                                    </button>
                                    <button 
                                        disabled={order.orderStatus == 'approved'?true:false}
                                        onClick={() => handleUpdateStatus(order._id, 'approved')} 
                                        className="approve-button">
                                        Approve
                                    </button>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
          
        </div>

    );
  }
export default Dashboard;