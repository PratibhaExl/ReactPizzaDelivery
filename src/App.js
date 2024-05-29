import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import RouteProtect from './ProtectRoute/RouteProtect'
import Products from './components/Products'
import Cart from './components/Cart'
import AddProduct from './components/AddProduct'
import { CartProvider } from './Context/CartContext';
import UpdateProduct from './components/UpdateProduct'
import Checkout from './components/Checkout'
import ThankYou from './components/ThankYou'
import MyOrders from './components/MyOrders'
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme from Material-UI
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'


// Create a custom theme by overriding the default theme colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#e0a800', // Change primary color
    },
    secondary: {
      main: '#61dafb', // Change secondary color
    },
    text: {
        primary: '#ffffff', // Set primary text color to white
        secondary: '#ffffff', // Set secondary text color to white
      },
  
    // You can override other default colors here
  },
});



export default function App() {
    return (
        <main > {/* Apply background color */}
            <CartProvider>
                <Router>
                    <NavBar />
                    <section>
                        <Routes>
                            <Route path='' element={<Login />} />
                            <Route path='signup' element={<Register />} />
                            <Route path="/dashboard" element={
                                <RouteProtect redirectTo="/dashboard">
                                    <Dashboard />
                                </RouteProtect>
                            } />
                            <Route path="/products" element={
                                <RouteProtect redirectTo="/products">
                                    <Products />
                                </RouteProtect>
                            } />
                            <Route path="/cart" element={
                                <RouteProtect redirectTo="/cart">
                                    <Cart />
                                </RouteProtect>
                            } />
                            <Route path="/addproduct" element={
                                <RouteProtect redirectTo="/addproduct">
                                    <AddProduct />
                                </RouteProtect>
                            } />
                            <Route path="/updateproduct/:id" element={
                                <RouteProtect redirectTo="/updateproduct/:id">
                                    <UpdateProduct />
                                </RouteProtect>
                            } />
                            <Route path="/checkout" element={
                                <RouteProtect redirectTo="/checkout">
                                    <Checkout />
                                </RouteProtect>
                            } />
                            <Route path="/thankyou" element={
                                <RouteProtect redirectTo="/thankyou">
                                    <ThankYou />
                                </RouteProtect>
                            } />
                           <Route path="/myorders" element={
                                <RouteProtect redirectTo="/myorders">
                                    <MyOrders />
                                </RouteProtect>
                            } />
<Route path="/profile" element={
                                <RouteProtect redirectTo="/profile">
                                    <Profile />
                                </RouteProtect>
                            } />
<Route path="/changepassword" element={
                                <RouteProtect redirectTo="/changepassword">
                                    <ChangePassword />
                                </RouteProtect>
                            } />




                        </Routes>
                    </section>
                </Router>
            </CartProvider>
        </main>
    )
}
