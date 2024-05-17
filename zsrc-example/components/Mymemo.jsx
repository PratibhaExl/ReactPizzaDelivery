import React,{useMemo, useState} from 'react'
export default function Mymemo() {
    const [number,setNumber]=useState(0);
    const [counter,setCounter]=useState(0);
    const squaredNum=useMemo(()=>{
        return squareNumber(number);
    },[number]);
    const INC=()=>{
        setCounter(counter+1);
    }
  return (
    <div>
        <h2> useMemo Example</h2>
        Number : <input type='text' onChange={(event)=> setNumber(event.target.value)}/>
        <p> Output : {squaredNum}</p>
        <button onClick={INC}> ++ </button>
        <p> Counter : {counter} </p>
    </div>
  )
}
//function to find sqaure of the number 
  function squareNumber(number){
     console.log("Squaring will be done!")
     return Math.pow(number,2);
  }
