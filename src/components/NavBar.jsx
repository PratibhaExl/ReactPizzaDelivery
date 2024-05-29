import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromToken, isAdmin, isLoggedIn } from '../services/AuthService';
import { useCart } from '../Context/CartContext';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../variable.css';

export default function NavBar() {
  const { cartCount } = useCart();
  const user = getUserDataFromToken();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("_token");
    setOpen(false);
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pizza Delivery App
          </Typography>
          {!isLoggedIn() && (
            <>
              <Button color="inherit" onClick={() => navigate("/")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
              {isAdmin() && <Button color="inherit" onClick={() => navigate("/dashboard")}>Home</Button>}
              <Button color="inherit" onClick={() => navigate("/products")}>Products</Button>
              <Button color="inherit" onClick={() => navigate("/cart")}>Cart ({cartCount})</Button>
              <Button color="inherit" onClick={() => navigate("/myorders")}>My Orders</Button>
              {isAdmin() && <Button color="inherit" onClick={() => navigate("/addproduct")}>Add Product</Button>}
              
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
               
                <MenuItem onClick={() => navigate("/profile")}> Profile Edit Update</MenuItem>
                <MenuItem onClick={() => navigate("/changepassword")}>Change Password</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hi {user ? user.fullname : 'User'}, are you sure you want to logout from the Pizza Delivery App?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="yellowbutton">No</Button>
          <Button onClick={handleLogout} autoFocus className="redbutton">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}




// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import { useNavigate } from 'react-router-dom';
// import { getUserDataFromToken, isAdmin, isLoggedIn } from '../services/AuthService';
// import { useCart } from '../Context/CartContext';
// import '../variable.css';
// import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// export default function NavBar() {
//   const { cartCount } = useCart();
//   const user = getUserDataFromToken();
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogoutClick = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("_token");
//     setOpen(false);
//     navigate("/");
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Pizza Delivery App
//           </Typography>
//           {!isLoggedIn() && (
//             <>
//               <Button color="inherit" onClick={() => navigate("/")}>Login</Button>
//               <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
//             </>
//           )}
//           {isLoggedIn() && (
//             <>
//               {isAdmin() && <Button color="inherit" onClick={() => navigate("/dashboard")}>Home</Button>}
//               <Button color="inherit" onClick={() => navigate("/products")}>Products</Button>
//               <Button color="inherit" onClick={() => navigate("/cart")}>Cart ({cartCount})</Button>
//               <Button color="inherit" onClick={() => navigate("/myorders")}>My Orders</Button>
//               {isAdmin() && <Button color="inherit" onClick={() => navigate("/addproduct")}>Add Product</Button>}
             
//               <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
//               <AccountCircleIcon/>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Hi {user ? user.fullname : 'User'}, are you sure you want to logout from the Pizza Delivery App?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} className="yellowbutton">No</Button>
//           <Button onClick={handleLogout} autoFocus className="redbutton">Yes</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>

//   );
// }


