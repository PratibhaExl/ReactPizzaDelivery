import React, { useEffect, useRef } from 'react'
export default function Myref() {
    const nameRef=useRef('');
    const emailRef=useRef('');
    useEffect(()=>{
       nameRef.current.focus();
    },[])
    const xyz=()=>{
        let namevalue=nameRef.current.value;
        let emailvalue=emailRef.current.value;
        if(namevalue!='' && emailvalue!=''){
            alert(namevalue+"---"+emailvalue)
        }
        else{
            alert("Please fill blank field");
        }
    }
  return (
    <div>
        <h2> useRef Example</h2>
        <div className='form-group'>
            <label> Enter Name</label>
            <input type='text' className='form-control' ref={nameRef}/>
        </div>
        <div className='form-group'>
            <label> Enter Email</label>
            <input type='text' className='form-control' ref={emailRef}/>
        </div>
        <input type='button' value="Send" onClick={xyz}/>
    </div>
  )
}
