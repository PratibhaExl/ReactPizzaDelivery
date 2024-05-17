import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";

const Nav=()=>{
  const category=["mens","womens","kids"];
  // const [cartcount,setCartcount]=useState(0);
  const {cartdata}=useContext(CartContext)
  useEffect(()=>{
    // if(localStorage.getItem('mycart')!=undefined){
    //   let arr=JSON.parse(localStorage.getItem('mycart'));
    //   setCartcount(arr.length);
    // }
  },[])
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Exl Training</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/counter">Counter</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Cart {cartdata.length>0 && <span> ({cartdata.length}) </span>}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myproducts">Myproducts</Link>
            </li>
            {/* Dynamic menu  */}
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            {category?.map((val,ind)=>
                  <li><Link class="dropdown-item" to={`/products/${val}`}> {val} </Link></li>
            )}
           
          </ul>
        </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}
export default Nav;