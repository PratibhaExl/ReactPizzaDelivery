import React, { useContext } from 'react'
import useGetData from './custom_hook/GetData'
import CartContext from '../Context/CartContext';
export default function Myproducts() {
    const proData=useGetData("http://localhost:3002/products");
    const {updateCart}=useContext(CartContext);//consume context
    const addCart=(id)=>{
         if(localStorage.getItem('mycart')!=undefined){
            let arr=JSON.parse(localStorage.getItem('mycart'));
            if(arr.includes(id)){
                alert("product already in a cart")
            }
            else{
                arr.push(id);
                localStorage.setItem('mycart',JSON.stringify(arr));
                updateCart(arr);
                alert("Product Add To cart")
            }
         }
         else{
            let arr=[];
            arr.push(id);
            localStorage.setItem('mycart',JSON.stringify(arr));
            updateCart(arr);
            alert("Product Add To cart")
         }
    }
  return (
    <div>
        <h2> Latest Products</h2>
        <div className='row'>
            {proData?.map(pro=> 
              <div key={pro.id} className='col-sm-4'> 
                 <div className="card" style={{width: '18rem'}}>
  <img src={pro.imagepath} className="card-img-top" alt="..." width={200} height={150}/>
  <div className="card-body">
    <h5 className="card-title">{pro.name}</h5>
    <p className="card-text"> Price : Rs.{pro.price} <br/>
     Quantity : {pro.quantity}
    </p>
    <button className="btn btn-primary" onClick={()=> addCart(pro.id)}> Add Cart </button>
  </div>
</div>
              </div>
            )}
        </div>
    </div>
  )
}
