

// Cart.jsx

import React from 'react';
import { useCart } from '../Context/CartContext';
import './Cart.css';
import { placeOrder } from '../services/ProductService'; 
import {getUserDataFromToken } from '../services/AuthService';
import { useParams, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

    const { cartItems, clearCart, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const loggedInUserInfo = getUserDataFromToken()
    console.log("userdata",loggedInUserInfo);



  const handleRemove = (productId) => {
    removeFromCart(productId);
  };
    const handleCheckout = async () => {
    navigate(`/checkout`);

    };

    return (
        <div className="cart-container">
             <h2>Cart</h2>
       <div className="cart-items-container">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.imagePath} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <button onClick={() => handleRemove(item)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total items: {cartItems.length}</p>
        <p>Total price: ${totalPrice}</p>
      </div>
            <button onClick={handleCheckout} className="checkout-button">Checkout</button>
        </div>
    );
};

export default Cart;

