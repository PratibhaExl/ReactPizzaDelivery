const initialState={count:0};
const CounterReducer=(state=initialState,actions)=>{
  switch(actions.type){
    case 'INC' : return {count:state.count+actions.payload}
    case 'DEC' : return {count:state.count-actions.payload}
    case 'RESET' : return {count:0}
    default : return state;
  }
}
export default CounterReducer;