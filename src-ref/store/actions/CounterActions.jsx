const INCREMENT=(data)=>{
    return {type:'INC',payload:data}
}
const DECREMENT=(data)=>{
    return {type:'DEC',payload:data}
}
const RESET=()=>{
    return {type:'RESET'}
}
const ADDPRO=(data)=>{
   return {type:'ADDP',payload:data}
}
export {INCREMENT,DECREMENT,RESET,ADDPRO}