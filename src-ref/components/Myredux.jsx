import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ADDPRO, DECREMENT, INCREMENT, RESET } from '../store/actions/CounterActions';

export default function Myredux() {
    const {count}=useSelector(state=> state.counter);
    const {products}=useSelector(state=> state.product);
    const dispatch=useDispatch();
  return (
    <div>
        <h2> Redux Implementation</h2>
        <p> The redux counter is {count}</p>
        <button onClick={()=> dispatch(INCREMENT(3))}> ++ </button>
        <button onClick={()=> dispatch(DECREMENT(2))}> -- </button>
        <button onClick={()=> dispatch(RESET())}> Reset </button>
        <hr/>
        <ul>
            {products?.map((pro,index)=>
               <li key={index}> {pro} </li>
         )}
         <button onClick={()=> dispatch(ADDPRO('task'))}> Add</button>
        </ul>
    </div>
  )
}
