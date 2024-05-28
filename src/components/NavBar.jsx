import * as  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromToken, isAdmin, isLoggedIn } from '../services/AuthService';
import { useCart } from '../Context/CartContext';

export default function NavBar() {
  const { cartCount } = useCart();
  const user = getUserDataFromToken();

    const navigate=useNavigate();
    const logout=()=>{
       if(window.confirm("Do u want to logout ?")){
          localStorage.removeItem("_token");
          navigate("/");
       }
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pizza Delivery App
          </Typography>
          {!isLoggedIn() && <> 
            <Button color="inherit" onClick={()=> navigate("/")}>Login</Button>
            <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
          </>}
          {isLoggedIn() && <> 
            {isAdmin() && <> 
            <Button color="inherit" onClick={()=> navigate("/dashboard")}>Home</Button></>}
            <Button color="inherit" onClick={()=> navigate("/products")}>Products</Button>
            <Button color="inherit" onClick={()=> navigate("/cart")}>Cart {cartCount}</Button>
            <Button color="inherit" onClick={()=> navigate("/myorders")}>
            {user.role === 'admin'?'My Orders':'My Orders'}
            </Button>
            {isLoggedIn() && isAdmin() && <> 
              <Button color="inherit" onClick={()=> navigate("/addproduct")}>Add Product</Button>
            </>}
            {/* {` Welcome ${user.fullname}`} */}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
