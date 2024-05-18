import axios from 'axios';
const API_URL="http://localhost:6677/api/v1/products";
const addProduct=(data)=>{
    return axios.post(`${API_URL}/addproduct`,data)
}
const deleteProduct=(product)=>{
    return axios.delete(`${API_URL}/deleteproduct/:${product._id}`)
}
const updateProduct = (id, data) => {
    return axios.put(`${API_URL}/updateproduct/${id}`, data);
}
  
export {addProduct, deleteProduct , updateProduct  };