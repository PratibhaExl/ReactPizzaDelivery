 import './ProductComponent.css'; // Importing CSS file for styling
 import React, { useState } from 'react';
 import { useCart } from '../Context/CartContext';
 import { isAdmin, isLoggedIn } from '../services/AuthService';
 import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from Font Awesome

const ProductComponent = ({ id, image, name, price, product,  onEdit, onDelete }) => {

  const { addToCart, removeFromCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item._id === product._id);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>${price}</p>
       
      <div className="product-buttons">
        {isLoggedIn() && isAdmin() && <> 
        <button onClick={() => onEdit(product)} className="edit-button"> <FaEdit /> {/* Edit icon */} </button>
        <button onClick={() => onDelete(product)} className="delete-button"><FaTrash /> {/* Delete icon */}</button>
        </>}

        {isInCart ? (
        <button onClick={() => removeFromCart(product)} className="remove-button" >Remove from Cart</button>
      ) : (
        <button onClick={() => addToCart(product)} className="add-to-cart-button"  >Add to Cart</button>
      )}
</div>

      </div>
    </div>
  );
};

export default ProductComponent;

