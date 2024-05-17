import { useState } from "react";
import Myforms from "./Myforms";
const Counter=()=>{
    //define state 
    const [count,setCount]=useState(0);
    return(
        <>
          <h3> State Counter Example</h3>
          <Myforms />
          <hr/>
          <p> The counter is {count}</p>
          <button onClick={()=> setCount(val=> val+1)} className="btn btn-success"> ++ </button>
          <button onClick={()=> setCount(val=> val-1)} className="btn btn-danger"> -- </button>
          <button onClick={()=> setCount(0)} className="btn btn-primary"> Reset </button>
        </>
    )
}
export default Counter;