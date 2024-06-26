import axios from 'axios';
const API_URL="http://localhost:6677/api/v1/products";
const addProduct=(data)=>{
    return axios.post(`${API_URL}/addproduct`,data)
}
const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};
const updateProduct = (id, data) => {
    return axios.post(`${API_URL}/update/${id}`, data);
};

export {addProduct, deleteProduct , updateProduct  };