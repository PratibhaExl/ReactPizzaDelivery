import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './ThankYou.css'; // Create ThankYou.css file for custom styles

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    const handleOrderMorePizza = () => {
        navigate('/products');
    };
    
    return (
        <div className="thank-you-container">
            <h2 className="thank-you-heading">Thank You!</h2>
            <p className="thank-you-message">Your order has been successfully placed.</p>
            <p className="order-status">Your order status is <span className="order-status-value">{location.state.orderStatus}</span></p>

            <button onClick={handleOrderMorePizza} className="order-more-button">Order More Pizza</button>
        </div>
    );
};

export default ThankYou;


// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useCart } from '../Context/CartContext';
// import './ThankYou.css'; // Create ThankYou.css file for custom styles

// const ThankYou = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { clearCart } = useCart();

//     useEffect(() => {
//         clearCart();
//     }, [clearCart]);

//     const handleClose = () => {
//         navigate('/products');
//     };
    
//     return (
//         <div className="thank-you-container">
//             <h2 className="thank-you-heading">Thank You!</h2>
//             <p className="thank-you-message">Your order has been successfully placed.</p>
//             <p className="order-status">Your order status is <span className="order-status-value">{location.state.orderStatus}</span></p>

//             <button onClick={handleClose} className="close-button">Close</button>
//         </div>
//     );
// };

// export default ThankYou;


