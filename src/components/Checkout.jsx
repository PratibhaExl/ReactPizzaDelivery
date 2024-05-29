import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { useCart } from '../Context/CartContext';
import { placeOrder } from '../services/OrderService';
import { getUserDataFromToken } from '../services/AuthService';
import { useParams, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Checkout = ({ }) => {
    const navigate = useNavigate();
    const { cartItems, clearCart, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const user = getUserDataFromToken();

    useEffect(() => {
        console.log("userdata", user.role, typeof (user.role));
    }, [])

    const handleSaveOrder = async () => {
        var orderStatus;
        if (user.role == "admin") { orderStatus = "approved" } else { orderStatus = "pending" }

        const paymentData = {
            paymentMethod: paymentMethod,
            cardNumber: cardNumber,
            cardExpiry: cardExpiry,
            cardCvv: cardCvv,
            upiId: upiId,
        }

        const orderData = {
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            orderStatus: orderStatus,
            cartItems,
            totalPrice,
            paymentData,
        };

        placeOrder(orderData)
            .then(response => {
                const data = response.data;
                if (data.err === 0) {
                    console.log("orderStatus,", data?.order?.orderStatus)
                    setSnackbarSeverity('success');
                    setSnackbarMessage(data.msg);
                    setOpenSnackbar(true);
                    setTimeout(() => 
                        navigate('/thankyou', { state: {orderStatus:data.order.orderStatus} })
                        , 4000);
                    
                } else {
                    setSnackbarSeverity('error');
                    setSnackbarMessage(data.msg);
                    setOpenSnackbar(true);
                }
            })
            .catch(error => console.error('Error placing order:', error));

    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handlePaymentMethodChange = (method) => {
        setErrorMessage("");
        setPaymentMethod(method);
    };

    const handlePlaceOrder = () => {
        if (paymentMethod === 'card') {
            // Validate card fields
            if (!cardNumber || !cardExpiry || !cardCvv) {
                setErrorMessage('Please fill all card details');
                return;
            }
        } else if (paymentMethod === 'upi') {
            // Validate UPI field
            if (!upiId) {
                setErrorMessage('Please provide UPI ID');
                return;
            }
        }
        // Place order
        handleSaveOrder(paymentMethod);
    };

    return (
        <div className="checkout-container">

            <h2>Checkout</h2>
            <div className="payment-options">
                <button className={paymentMethod === 'card' ? 'active' : ''} onClick={() => handlePaymentMethodChange('card')}>Credit Card</button>
                <button className={paymentMethod === 'upi' ? 'active' : ''} onClick={() => handlePaymentMethodChange('upi')}>UPI</button>
            </div>
            {paymentMethod === 'card' && (
                <form className="card-payment-form">
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Expiry Date" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                    <input type="text" placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
                </form>
            )}
            {paymentMethod === 'upi' && (
                <form className="upi-payment-form">
                    <input type="text" placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </form>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div>
                {cartItems.map(item => (
                    <div key={item._id}>
                        <p>{item.name} - ${item.price}</p>
                    </div>
                ))}

            </div>

            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ${totalPrice}</p>

            <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            ContentProps={{
              sx: { width: '100vh', paddingLeft: '5%', paddingRight: '5%' }
            }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}
                sx= {{ width: '100vh', paddingLeft: '5%', paddingRight: '5%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
    );
};

export default Checkout;
