import axios from 'axios';
const API_URL="http://localhost:6677/api/v1/profile";


const updateProfile=(data)=>{
    return axios.post(`${API_URL}/updateprofile`,data)
}

const changePassword= async (passwordData, config) => {
    const response = await axios.post(`${API_URL}/changepassword`, passwordData, config);
    return response;
};


export { updateProfile , changePassword};