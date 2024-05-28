import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductComponent from './ProductComponent';
import useGetResponseData from '../CustomHooks/GetResponseData';
import { deleteProduct } from '../services/ProductService';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../variable.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Products() {
  const [editedProduct, setEditedProduct] = useState(null);
  const productData = useGetResponseData("http://localhost:6677/api/v1/products/getallproducts");
  const [products, setProducts] = useState([]);
  const { cname } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (productData && productData.prodata) {
      setProducts(productData.prodata);
      setLoading(false);
    }
  }, [productData]);

  useEffect(() => {
    if (cname) {
      const filteredProducts = productData.prodata.filter(prod => prod.category === cname);
      setProducts(filteredProducts);
    }
  }, [cname, productData]);

  const handleEdit = (product) => {
    navigate(`/updateproduct/${product._id}`, { state: { product } });
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    let id = productToDelete._id.toString(); // Convert ObjectId to string
    setOpenDialog(false);
    setProductToDelete(null);
    setLoading(true);

    try {
      const res = await deleteProduct(id);
      if (res.data.err === 0) {
        setSnackbarMessage("Product deleted successfully");
        setSnackbarSeverity("success");
        setProducts(products.filter(p => p._id !== id));
      } else {
        setSnackbarMessage(res.data.msg);
        setSnackbarSeverity("error");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setSnackbarMessage("An error occurred while deleting the product.");
      setSnackbarSeverity("error");
    }
    setLoading(false);
    setOpenSnackbar(true);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="product-row">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        products.map((product, index) => (
          <div className="product" key={index}>
            <ProductComponent
              image={product.imagePath}
              name={product.name}
              price={product.price}
              product={product}
              onEdit={handleEdit}
              onDelete={() => handleDelete(product)}
            />
          </div>
        ))
      )}
      <Dialog
        open={openDialog}
        onClose={cancelDelete}
      >
        <DialogTitle>{"Product Delete !"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the product {productToDelete ? productToDelete.name : ""}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary" className="yellowbutton">
            No
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus  className="redbutton" >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: { width: '100vh', paddingLeft: '5%', paddingRight: '5%' }
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}
          sx={{ width: '100vh', paddingLeft: '5%', paddingRight: '5%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
