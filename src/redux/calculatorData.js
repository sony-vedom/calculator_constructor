import numbers from "../Sidebar/Numbers/Numbers";
import Numbers from "../Sidebar/Numbers/Numbers";

const PLUS = "PLUS" // +
const MINUS = "MINUS" // -
const DIVISION = "DIVISION" // /
const MULTIPLICATION = "MULTIPLICATION" // *
const SET_NUMBER = "SET_NUMBER"
const SET_TYPE_OPERATION = "SET_TYPE_OPERATION"
const RELOAD_NUMBER = "RELOAD_NUMBER"
const ADD_DOT = "ADD_DOT"
const RESET_VALUE = "RESET_VALUE"


const initialState = {
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    operators: ["/", "х", "-", "+"],
    number: 0,
    number2: "",
    typeOperation: "",
    isResetValue: false,
}

const calculatorData = (state = initialState, action) => {
    const roundingAndIsFinite = (number) => {
        if (!isFinite(number)) number = "Не определено"
        const stringNumber = String(number)
        if (stringNumber.length > 17) {
            const minusLength = stringNumber.includes("-") ? 2 : 1
            number = number.toFixed(17 - minusLength - (stringNumber.slice(0, stringNumber.indexOf(".")).length))
        }
        return number
    }
    switch (action.type) {
        case PLUS: {
            let number = Number(state.number) + Number(state.number2)
            number = roundingAndIsFinite(number)
            return {
                ...state,
                number: number,
                number2: "",
            }
        }
        case MINUS: {
            let number = Number(state.number) - Number(state.number2)
            number = roundingAndIsFinite(number)
            return {
                ...state,
                number: number,
                number2: "",
            }
        }

        case DIVISION: {
            let number = Number(state.number) / Number(state.number2)
            number = roundingAndIsFinite(number)
            debugger
            return {
                ...state,
                number: number,
                number2: "",
            }
        }

        case MULTIPLICATION: {
            let number = Number(state.number) * Number(state.number2)
            number = roundingAndIsFinite(number)

            return {
                ...state,
                number: number,
                number2: "",
            }
        }

        case SET_TYPE_OPERATION: {
            return {
                ...state,
                typeOperation: action.typeOperation,
            }
        }

        case SET_NUMBER: {
            console.log(state.isResetValue)
            if (state.isResetValue) {
                return {
                    ...state,
                    isResetValue: false,
                    number: action.number,
                }
            }

            if (state.typeOperation) {

                if (String(state.number2 + action.number).length > 17) {
                    debugger
                    return {
                        ...state,
                        number2: state.number2,
                    }
                } else {
                    debugger
                    return (String(state.number2) === "0" || state.number2 === "Не определено") ?
                        {...state, number2: action.number}
                        : {...state, number2: state.number2 + action.number}
                }
            }

            if (String(state.number + action.number).length > 17) {
                return {
                    ...state,
                    number: state.number,
                }
            } else {
                return (String(state.number) === "0" || state.number === "Не определено") ?
                    {...state, number: action.number}
                    : {...state, number: state.number + action.number}
            }
        }

        case ADD_DOT: {
            let dot = "."
            String(state.number).includes(".") ? dot = state.number : dot = String(state.number) + "."
            return {
                ...state,
                number: dot,
            }

        }

        case RESET_VALUE: {
            return {
                ...state,
                isResetValue: action.booleanValue,
            }
        }

        case RELOAD_NUMBER: {
            return {
                ...state,
                number: 0,
            }
        }
        default: {
            return state
        }
    }
}

export const setNumber = (number) => ({
    type: SET_NUMBER,
    number
})

export const addDot = () => ({
    type: ADD_DOT,
})

export const reloadNumber = () => ({
    type: RELOAD_NUMBER,
})

const resetValue = (booleanValue) => ({
    type: RESET_VALUE,
    booleanValue
})

export const makeOperation = () => (dispatch, getState) => {
    switch (getState().calculatorData.typeOperation) {
        case PLUS: {
            dispatch(plusAction())
            break;
        }
        case MINUS: {
            dispatch(minusAction())
            break;
        }
        case DIVISION: {
            dispatch(divisionAction())
            break;
        }
        case MULTIPLICATION: {
            dispatch(multiplicationAction())
            break;
        }
    }
    dispatch(resetValue(true))
    getState().calculatorData.typeOperation = ""
}

export const setTypeOperation = (typeOperation) => {
    return {
        type: SET_TYPE_OPERATION,
        typeOperation
    }
}

const plusAction = () => ({
    type: PLUS,
})

const minusAction = () => ({
    type: MINUS,
})

const divisionAction = () => ({
    type: DIVISION,
})

const multiplicationAction = () => ({
    type: MULTIPLICATION,
})


export default calculatorData;