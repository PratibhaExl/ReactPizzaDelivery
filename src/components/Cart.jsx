import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import './Cart.css';
import { placeOrder } from '../services/ProductService'; 
import { getUserDataFromToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const loggedInUserInfo = getUserDataFromToken();
  console.log("userdata", loggedInUserInfo);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || totalPrice === 0) {
      setSnackbarOpen(true);
    } else {
      navigate(`/checkout`);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
            <button onClick={() => handleRemove(item._id)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total items: {cartItems.length}</p>
        <p>Total price: ${totalPrice}</p>
      </div>
      <button onClick={handleCheckout} className="checkout-button">Checkout</button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      ContentProps={{
        sx: { width: '100vh', paddingLeft: '5%', paddingRight: '5%' }
      }}
      >
        <Alert onClose={handleSnackbarClose} severity="warning"
        sx= {{ width: '100vh', paddingLeft: '5%', paddingRight: '5%' }}
        >
          Add products to cart to do checkout. Your cart is empty.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
