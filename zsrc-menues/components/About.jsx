import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import Myref from "./Myref";

const About=()=>{
  const [searchParam,setSearchParam]=useSearchParams();
  const [seconds,setSeconds]=useState(0);
  useEffect(()=>{
    const timer=setInterval(()=> setSeconds((s)=> s+1) ,1000);
    return ()=>{
        clearInterval(timer);
    }
  },[])
    return(
      <>
        <h3> About Page</h3>
        <p> Search : {searchParam.get('ser')}</p>
        <p> Seconds : {seconds}</p>
        <hr/>
        <Myref />
      </>
    )
  }
  export default About;