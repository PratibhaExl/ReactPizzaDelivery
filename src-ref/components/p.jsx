import './ProductComponent.css'; // Importing CSS file for styling
import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { isAdmin, isLoggedIn } from '../services/AuthService';

const ProductComponent = ({ id, image, name, price, product, onEdit, onDelete  }) => {

 const { addToCart, removeFromCart, cartItems } = useCart();
 const isInCart = cartItems.some(item => item.id === product.id);



 return (
   <div className="product-card">
     <div className="product-image">
       <img src={image} alt={name} />
     </div>
     <div className="product-info">
       <h3>{name}</h3>
       <p>${price}</p>
      
       {isLoggedIn() && isAdmin() && <> 
       <button onClick={() => onEdit(product)}>Edit</button>
       <button onClick={() => onDelete(product.id)}>Delete</button>
       </>}
       
       {isInCart ? (
       <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
     ) : (
       <button onClick={() => addToCart(product)}>Add to Cart</button>
     )}


     </div>
   </div>
 );
};

export default ProductComponent;

