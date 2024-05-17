const initialState={products:["A","B","C"]}
const ProductReducer=(state=initialState,actions)=>{
   switch(actions.type){
      case 'ADDP': return {products:[...state.products,actions.payload]}
      default : return state;
   }
}
export default ProductReducer;