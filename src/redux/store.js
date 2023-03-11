import {legacy_createStore as createStore, combineReducers} from "redux"
import calculatorData from "./calculatorData";
import constructorState from "./constructorState"


const reducers = combineReducers({
    calculatorData,
    constructorState,
})

const store = createStore(reducers)

export default store;