import axios from 'axios';
import {jwtDecode } from 'jwt-decode';
const API_URL="http://localhost:6677/api/v1/auth";
const userLogin=(data)=>{
  return axios.post(`${API_URL}/signin`,data)
}
const userRegister=(data)=>{
  return axios.post(`${API_URL}/signup`,data)
}
//get token from localstorage 
const getToken=()=>{
   return localStorage.getItem("_token");
}
const isLoggedIn=()=>{
   return getToken()!=undefined?true:false;
}
//get token data 
const getUserDataFromToken=()=>{
  try{
    return jwtDecode(getToken())
  }
  catch(err){
    return null;
  }
}
const isAdmin=()=>{
  console.log("logged user info ->",  getUserDataFromToken())
  //return !getUserDataFromToken()?false:getUserDataFromToken();
  return !getUserDataFromToken()?false:getUserDataFromToken().role=='admin'?true:false;
}
export {userLogin,userRegister,getToken,isLoggedIn,getUserDataFromToken,isAdmin};