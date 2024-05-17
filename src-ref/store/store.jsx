import { combineReducers, createStore } from "redux";
import CounterReducer from "./reducers/CounterReducer";
import ProductReducer from "./reducers/ProductReducer";
const rootReducer=combineReducers({
    counter:CounterReducer,
    product:ProductReducer})
const store=createStore(rootReducer);
export default store;