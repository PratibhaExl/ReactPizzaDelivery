import React from 'react'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import RouteProtect from './ProtectRoute/RouteProtect'
import Products from './components/Products'
import Cart from './components/Cart'
import AddProduct from './components/AddProduct'
import { CartProvider } from './Context/CartContext';

export default function App() {
  return (
    <main>
<CartProvider>
      <Router>
       <NavBar />
       <section>
           <Routes>
               <Route path='' element={<Login />}/>
               <Route path='signup' element={<Register />}/>
               <Route path="/dashboard" element={
                <RouteProtect redirectTo="/">
                      <Dashboard />
                  </RouteProtect>
               }/>
               <Route path="/products" element={
                <RouteProtect redirectTo="/">
                      <Products />
                  </RouteProtect>
               }/>
               <Route path="/cart" element={
                <RouteProtect redirectTo="/">
                      <Cart />
                  </RouteProtect>
               }/>
               <Route path="/addproduct" element={
                <RouteProtect redirectTo="/addproduct">
                      <AddProduct />
                  </RouteProtect>
               }/>
           </Routes>
       </section>
       </Router>
       </CartProvider>
    </main>
  )
}
