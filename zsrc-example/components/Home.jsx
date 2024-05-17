import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mymemo from "./Mymemo";
import ThemeContext from "../Context/ThemeContext";
const Home=()=>{
  const {theme,toggleTheme}=useContext(ThemeContext)
    const title="My Home Page";
    const arr=["A","B","C","D"]
    const [ser,setSer]=useState('');
    const navigate=useNavigate();//for redirect
    const xyz=()=>{
      if(ser!=''){
          navigate('/about?ser='+ser);
      }
      else{
        alert("please fill blank field");
      }
    }
    return(
      <div style={{...theme}}>
        <h3> {title}</h3>
        <button onClick={toggleTheme}> Change Theme</button>
        <Mymemo />
        <hr/>
        <p>
            Search : <input type="search" onChange={(event)=> setSer(event.target.value)}/> <input type="button" value="Search" onClick={xyz}/>
        </p>
        {arr.length>0 ? 
        <div> 
            <h5> Courses</h5>
            <ul>
                {arr.map((val,ind)=>
                   <li key={ind}> {val} </li>
                )}
            </ul>
        </div> : <div>
                 <p> No Course Found</p>
              </div>}
      </div>
    )
  }
  export default Home;