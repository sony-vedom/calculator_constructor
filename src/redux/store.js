import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import calculatorData from "./calculatorData";
import constructorState from "./constructorState"
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';


const reducers = combineReducers({
    calculatorData,
    constructorState,
})

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
))

export default store;