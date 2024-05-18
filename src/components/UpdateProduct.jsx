
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let key in productState) {
            formData.append(key, productState[key]);
        }

        updateProduct(id, formData)
            .then(res => {
                if (res.data.err === 0) {
                    alert(res.data.msg);
                    navigate('/products');
                } else {
                    setErrMsg(res.data.msg);
                }
            })
            .catch(err => console.log(err));
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
                        <TextField name="name" required fullWidth id="name" label="Name" value={productState.name} onChange={handler} />
                        <TextField name="category" required fullWidth id="category" label="Category" value={productState.category} onChange={handler} />
                        <TextField name="price" required fullWidth id="price" label="Price" value={productState.price} onChange={handler} />
                        <TextField name="description" required fullWidth id="description" label="Description" value={productState.description} onChange={handler} />
                        <TextField name="availableItems" required fullWidth id="availableItems" label="Available Items" value={productState.availableItems} onChange={handler} />
                        <TextField name="manufacturer" required fullWidth id="manufacturer" label="Manufacturer" value={productState.manufacturer} onChange={handler} />
                        <TextField type="file" id="file" name="file" autoComplete="file" onChange={upload} />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Update Product</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}



// import React, { useState, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Alert from '@mui/material/Alert';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { updateProduct } from '../services/ProductService';

// const defaultTheme = createTheme();

// export default function UpdateProduct() {
//   const { state: locationState } = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();
  
//   const [productState, setProductState] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     availableItems: '',
//     manufacturer: '',
//     imageRef: ''
//   });
//   const [errMsg, setErrMsg] = useState("");

//   useEffect(() => {
//     if (locationState && locationState.product) {
//       setProductState(locationState.product);
//     }
//   }, [locationState]);

//   const handler = (event) => {
//     const { name, value } = event.target;
//     setProductState(prevState => ({ ...prevState, [name]: value }));
//   };

//   const upload = (event) => {
//     if (event.target.files.length > 0) {
//       setProductState(prevState => ({ ...prevState, imageRef: event.target.files[0] }));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (productState.imageRef !== "") {
//       if (productState.imageRef.type === "image/jpeg" || productState.imageRef.type === "image/png") {
//         let formData = new FormData();
//         for (let key in productState) {
//           formData.append(key, productState[key]);
//         }
//         updateProduct(id, formData)
//           .then(res => {
//             if (res.data.err === 0) {
//               alert(res.data.msg);
//               navigate('/products');
//             } else {
//               setErrMsg(res.data.msg);
//             }
//           })
//           .catch(err => console.log(err));
//       } else {
//         setErrMsg("Only support Jpg and Png Images");
//       }
//     } else {
//       setErrMsg("Please select an image");
//     }
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
//             Update Product
//           </Typography>
//           {errMsg && <Alert severity="error">{errMsg}</Alert>}
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} container spacing={2}>
//             <TextField
//               name="name"
//               required
//               fullWidth
//               id="name"
//               label="Name"
//               value={productState.name}
//               onChange={handler}
//             />
//             <TextField
//               name="category"
//               required
//               fullWidth
//               id="category"
//               label="Category"
//               value={productState.category}
//               onChange={handler}
//             />
//             <TextField
//               name="price"
//               required
//               fullWidth
//               id="price"
//               label="Price"
//               value={productState.price}
//               onChange={handler}
//             />
//             <TextField
//               name="description"
//               required
//               fullWidth
//               id="description"
//               label="Description"
//               value={productState.description}
//               onChange={handler}
//             />
//             <TextField
//               name="availableItems"
//               required
//               fullWidth
//               id="availableItems"
//               label="Available Items"
//               value={productState.availableItems}
//               onChange={handler}
//             />
//             <TextField
//               name="manufacturer"
//               required
//               fullWidth
//               id="manufacturer"
//               label="Manufacturer"
//               value={productState.manufacturer}
//               onChange={handler}
//             />
//             <TextField
//               type="file"
//               id="file"
//               name="file"
//               autoComplete="file"
//               onChange={upload}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Update Product
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
