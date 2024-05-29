import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getUserDataFromToken, userLogin, isLoggedIn, isAdmin } from '../services/AuthService';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        PRATIBHA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showFields, setShowFields] = useState(true);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/products');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      userLogin(formData)
        .then((res) => {
          if (res.data.err === 0) {
            localStorage.setItem('_token', res.data.token);
            setSnackbarOpen(true);
            setTimeout(() => {
              if (isAdmin()) {
                navigate('/dashboard');
              } else {
                navigate('/products');
              }
            }, 1500);
          } else {
            setFormErrors({ login: res.data.msg });
          }
        })
        .catch((err) => console.log(err));
    } else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    if (formData.email === 'true') {
      setShowFields(false);
    } else {
      setShowFields(true);
    }
  }, [formData.email]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {showFields && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {formErrors.login && (
              <Typography color="error" variant="body2">
                {formErrors.login}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: { width: '100vh', paddingLeft: '5%', paddingRight: '5%' }
        }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success"  sx= {{ width: '100vh', paddingLeft: '5%', paddingRight: '5%' }}>
            Logged in successfully!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { getUserDataFromToken, userLogin, isLoggedIn, isAdmin } from '../services/AuthService';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="pratibha">
//         Pratibha
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   useEffect(() => {
//     if (isLoggedIn()) {
//       navigate('/products');
//     }
//   }, [navigate]);


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       const formdata = {
//         email,
//         password,
//       };
//       userLogin(formdata)
//         .then((res) => {
//           if (res.data.err === 0) {
//             //store token in localstorage 
//             console.log("token", res.data.token);
//             localStorage.setItem("_token", res.data.token);
//             if (isAdmin()) {
//               navigate("/dashboard");
//             } else {
//               navigate("/products");
//             }
//             setOpenSnackbar(true);
//             clearForm();
//           } else {
//             alert(res.data.msg);
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     if (!email) {
//       setEmailError('Email is required');
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError('Email is not valid');
//       valid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!password) {
//       setPasswordError('Password is required');
//       valid = false;
//     } else {
//       setPasswordError('');
//     }

//     return valid;
//   };

//   const clearForm = () => {
//     setEmail('');
//     setPassword('');
//     setEmailError('');
//     setPasswordError('');
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!emailError}
//               helperText={emailError}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               error={!!passwordError}
//               helperText={passwordError}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item>
//                 <Link href="/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//           <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//             Logged in successfully!
//           </Alert>
//         </Snackbar>
//       </Container>
//     </ThemeProvider>
//   );
// }
