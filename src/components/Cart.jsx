
import React from 'react';
import { useCart } from '../Context/CartContext';
import './Cart.css'; // Import CSS file for styling

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.imagepath} alt={item.name} className="item-image" />
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
    </div>
  );
};

export default Cart;

// const Cart = () => {
//   const { cartItems, removeFromCart } = useCart();

//   const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

//   const handleRemove = (productId) => {
//     removeFromCart(productId);
//   };

//   const handleCheckout = () => {
//     // Implement checkout logic here
//   };

//   return (
//     <div className="cart">
//       <h2>Cart</h2>
//       <div className="cart-items">
//         {cartItems.map((item) => (
//           <div className="cart-item" key={item._id}>
//             <img src={item.imagepath} alt={item.name} />
//             <div className="item-details">
//               <h3>{item.name}</h3>
//               <p>${item.price}</p>
//             </div>
//             <button onClick={() => handleRemove(item._id)}>Remove</button>
//           </div>
//         ))}
//       </div>
//       <div className="cart-summary">
//         <p>Total items: {cartItems.length}</p>
//         <p>Total price: ${totalPrice}</p>
//       </div>
//       <button onClick={handleCheckout}>Checkout</button>
//     </div>
//   );
// };

// export default Cart;
