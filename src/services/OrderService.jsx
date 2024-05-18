
import axios from 'axios';
const API_URL = "http://localhost:6677/api/v1/products";

const getAllUserOrders = (userData) => {
    return axios.post(`${API_URL}/getallorders`, userData);
};

const placeOrder = (orderData) => {
    return axios.post(`${API_URL}/placeorder`, orderData);
}
const getOrdersByUser = (userData) => {
    return axios.post(`${API_URL}/myorders`, userData);
};
const updateOrderStatus = (orderId, status) => {
    return axios.post(`${API_URL}/updateOrderStatus`, orderId, status);
};

export { getOrdersByUser, placeOrder, getAllUserOrders, updateOrderStatus };