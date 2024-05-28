import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { addProduct } from '../services/ProductService';

const defaultTheme = createTheme();

export default function AddProduct() {
  const [state, setState] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    availableItems: '',
    manufacturer: '',
    imageRef: ''
  });
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handler = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const upload = (event) => {
    if (event.target.files.length > 0) {
      setState(prevState => ({ ...prevState, imageRef: event.target.files[0] }));
      setFormErrors(prevErrors => ({ ...prevErrors, imageRef: '' }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!state.name) errors.name = "Name is required";
    if (!state.category) errors.category = "Category is required";
    if (!state.price) errors.price = "Price is required";
    if (!state.description) errors.description = "Description is required";
    if (!state.availableItems) errors.availableItems = "Available Items is required";
    if (!state.manufacturer) errors.manufacturer = "Manufacturer is required";
    if (!state.imageRef) errors.imageRef = "Image is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    
    if (state.imageRef && (state.imageRef.type === "image/jpeg" || state.imageRef.type === "image/png")) {
      let formData = new FormData();
      formData.append("name", state.name);
      formData.append("category", state.category);
      formData.append("price", state.price);
      formData.append("description", state.description);
      formData.append("availableItems", state.availableItems);
      formData.append("manufacturer", state.manufacturer);
      formData.append("attach", state.imageRef);
      
      addProduct(formData)
        .then(res => {
          if (res.data.err === 0) {
            setSnackbarMessage(res.data.msg);
            setSnackbarOpen(true);
            setTimeout(() => navigate('/products'), 5000);
          } else {
            setErrMsg(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    } else {
      setErrMsg("Only support Jpg and Png Images");
    }
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
            Add Product
          </Typography>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handler}
                  value={state.name}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="family-name"
                  onChange={handler}
                  value={state.category}
                  error={!!formErrors.category}
                  helperText={formErrors.category}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  onChange={handler}
                  value={state.price}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  onChange={handler}
                  value={state.description}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="availableItems"
                  label="Available Items"
                  name="availableItems"
                  autoComplete="availableItems"
                  onChange={handler}
                  value={state.availableItems}
                  error={!!formErrors.availableItems}
                  helperText={formErrors.availableItems}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="manufacturer"
                  label="Manufacturer"
                  name="manufacturer"
                  autoComplete="manufacturer"
                  onChange={handler}
                  value={state.manufacturer}
                  error={!!formErrors.manufacturer}
                  helperText={formErrors.manufacturer}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="file"
                  id="file"
                  name="file"
                  autoComplete="file"
                  onChange={upload}
                  error={!!formErrors.imageRef}
                  helperText={formErrors.imageRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            sx: { width: '100vh', paddingLeft: '5%', paddingRight: '5%' }
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
