import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import { updateProduct } from '../services/ProductService';

const defaultTheme = createTheme();

export default function UpdateProduct() {
    const { state: locationState } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [productState, setProductState] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        availableItems: '',
        manufacturer: '',
        imagePath: ''
    });
    const [errMsg, setErrMsg] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        if (locationState && locationState.product) {
            setProductState(locationState.product);
        }
    }, [locationState]);

    const handler = (event) => {
        const { name, value } = event.target;
        setProductState(prevState => ({ ...prevState, [name]: value }));
    };

    const upload = (event) => {
        if (event.target.files.length > 0) {
            setProductState(prevState => ({ ...prevState, imagePath: event.target.files[0] }));
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!productState.name) errors.name = "Name is required";
        if (!productState.category) errors.category = "Category is required";
        if (!productState.price) errors.price = "Price is required";
        if (!productState.description) errors.description = "Description is required";
        if (!productState.availableItems) errors.availableItems = "Available Items is required";
        if (!productState.manufacturer) errors.manufacturer = "Manufacturer is required";
        if (!productState.imagePath) errors.imagePath = "Please select an image";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        let _id = id.toString(); // Convert ObjectId to string
        console.log(id, "--", productState);
        if (productState.imagePath.type === "image/jpeg" || productState.imagePath.type === "image/png") {
            let formData = new FormData();
            formData.append("name", productState.name);
            formData.append("category", productState.category);
            formData.append("price", productState.price);
            formData.append("description", productState.description);
            formData.append("availableItems", productState.availableItems);
            formData.append("manufacturer", productState.manufacturer);
            formData.append("attach", productState.imagePath);
            updateProduct(_id, formData)
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
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Product
                    </Typography>
                    {errMsg && <Alert severity="error">{errMsg}</Alert>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={productState.name}
                                    onChange={handler}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.name}
                                    helperText={formErrors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="category"
                                    required
                                    fullWidth
                                    id="category"
                                    label="Category"
                                    value={productState.category}
                                    onChange={handler}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.category}
                                    helperText={formErrors.category}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="price"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    value={productState.price}
                                    onChange={handler}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.price}
                                    helperText={formErrors.price}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    value={productState.description}
                                    onChange={handler}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.description}
                                    helperText={formErrors.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="availableItems"
                                    required
                                    fullWidth
                                    id="availableItems"
                                    label="Available Items"
                                    value={productState.availableItems}
                                    onChange={handler}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.availableItems}
                                    helperText={formErrors.availableItems}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="manufacturer"
                                    required
                                    fullWidth
                                    id="manufacturer"
                                    label="Manufacturer"
                                    value={productState.manufacturer}
                                    onChange={handler}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.manufacturer}
                                    helperText={formErrors.manufacturer}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="file"
                                    id="file"
                                    name="file"
                                    autoComplete="file"
                                    onChange={upload}
                                    sx={{ mb: 2 }}
                                    error={!!formErrors.imagePath}
                                    helperText={formErrors.imagePath}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Update Product
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    ContentProps={{
                        sx: { width: '100vh',
                        paddingLeft: '5%',
                        paddingRight: '5%',
                    }
                    }}
                />
            </Container>
        </ThemeProvider>
    );
}
