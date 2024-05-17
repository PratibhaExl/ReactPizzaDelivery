import { useEffect,useState } from "react";
import axios from "axios";
const useGetData=(url)=>{
   const [data,setData]=useState([]);
   useEffect(()=>{
       axios.get(url)
       .then(res=> setData(res.data))
   },[])
   return data;
}
export default useGetData;