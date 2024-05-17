import React, { useState } from 'react'
import CartContext from './CartContext'
export default function CartItems({children}) {
    const [cartitem,setCartitem]=useState(localStorage.getItem('mycart')!=undefined ? JSON.parse(localStorage.getItem('mycart')):[]);
    const updateCart=(data)=>{
        setCartitem(data);
    }
  return (
    <CartContext.Provider value={{cartdata:cartitem,updateCart:updateCart}}>
        {children}
    </CartContext.Provider>
  )
}
