import * as  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../services/AuthService';
import { useCart } from '../Context/CartContext';

export default function NavBar() {
  const { cartCount } = useCart();

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Auth App
          </Typography>
          {!isLoggedIn() && <> 
            <Button color="inherit" onClick={()=> navigate("/")}>Login</Button>
            <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
          </>}
          {isLoggedIn() && <> 
            <Button color="inherit" onClick={()=> navigate("/dashboard")}>Home</Button>
            <Button color="inherit" onClick={()=> navigate("/products")}>Products</Button>
            <Button color="inherit" onClick={()=> navigate("/cart")}>Cart {cartCount}</Button>
            {isLoggedIn() && isAdmin() && <> 
              <Button color="inherit" onClick={()=> navigate("/addproduct")}>Add Product</Button>
            </>}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
