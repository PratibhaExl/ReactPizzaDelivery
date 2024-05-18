import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './Checkout.css';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    const handleClose = () => {
        navigate('/products');
    };
    
    return (
        <div className="thank-you-container">
            <h2>Thank You!</h2>
            <p>Your order has been successfully placed.</p>
            <p>Your order status is {location.state.orderStatus}</p>

            <button onClick={handleClose} className="place-order-button">Close</button>
        </div>
    );
};

export default ThankYou;
