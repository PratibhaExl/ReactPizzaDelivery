import  React,{useState} from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { addProduct } from '../services/ProductService';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddProduct() {
  const [state,setState]=useState({
    name:'',
    category:'',
    price:'',
    description:'',
    availableItems:'',
    manufacturer:'',
    imageRef:''
  })
  const [errMsg,setErrMsg]=useState("");
  const handler=(event)=>{
     const {name,value}=event.target;
     setState({...state,[name]:value})
  }
  //for uploading 
  const upload=(event)=>{
      if(event.target.files.length>0){
         setState({...state,imageRef:event.target.files[0]})
      }
  }
 const handleSubmit=(event)=>{
    event.preventDefault();
    if(state.imageRef!=""){
       if(state.imageRef.type==="image/jpeg" || state.imageRef.type==="image/png"){
          //when we send attachment with data we use FormData 
          let formData=new FormData();
          formData.append("name",state.name);
          formData.append("category",state.category);
          formData.append("price",state.price);
          formData.append("description",state.description);
          formData.append("availableItems",state.availableItems);
          formData.append("manufacturer",state.manufacturer);
          formData.append("attach",state.imageRef);
          addProduct(formData)
          .then(res=> {
            if(res.data.err==0){
              alert(res.data.msg)
            }
            if(res.data.err==1){
              setErrMsg(res.data.msg)
            }
          })
          .catch(err=> console.log(err))
         
       }
       else{
        setErrMsg("Only support Jpg and Png Images");
       }
    }
    else{
       setErrMsg("Please select a image");
    }
 }

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
          {errMsg!="" && <Alert severity="error">{errMsg}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="family-name"
                  onChange={handler}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  
                  id="description"
                  autoComplete="description"
                  onChange={handler}
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
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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
        
      </Container>
    </ThemeProvider>
  );
}