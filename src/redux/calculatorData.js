const PLUS = "PLUS" // +
const MINUS = "MINUS" // -
const DIVISION = "DIVISION" // /
const MULTIPLICATION = "MULTIPLICATION" // *
const SET_NUMBER = "SET_NUMBER"
const SET_TYPE_OPERATION = "SET_TYPE_OPERATION"
const RELOAD_NUMBER = "RELOAD_NUMBER"
const ADD_DOT = "ADD_DOT"

const initialState = {
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    operators: ["/", "х", "-", "+"],
    number: 0,
    number2: null,
    result: null,
    typeOperation: "",
}

const calculatorData = (state = initialState, action) => {
    const roundingAndIsFinite = (number) => {
        if (!isFinite(number)) return "Не определено"
        const stringNumber = String(number)
        if (stringNumber.length > 14) {
            try {
                const minusLength = stringNumber.includes("-") ? 2 : 1
                number = number.toFixed(14 - minusLength - (stringNumber.slice(0, stringNumber.indexOf(".")).length))
            } catch {
                return String(Math.round(number))
            }
        }
        return number
    }


    switch (action.type) {

        case PLUS: {
            return {
                ...state,
                result: roundingAndIsFinite(Number(state.number) + Number(state.number2)),
                number: null,
                number2: 0,
                typeOperation: "",
            }
        }
        case MINUS: {
            return {
                ...state,
                number: null,
                number2: null,
                result: roundingAndIsFinite(Number(state.number) - Number(state.number2)),
                typeOperation: "",

            }
        }

        case DIVISION: {
            return {
                ...state,
                number: null,
                number2: null,
                result: roundingAndIsFinite(Number(state.number) / Number(state.number2)),
                typeOperation: "",
            }
        }

        case MULTIPLICATION: {
            return {
                ...state,
                number: null,
                number2: null,
                result: roundingAndIsFinite(Number(state.number) * Number(state.number2)),
                typeOperation: "",
            }
        }

        case SET_TYPE_OPERATION: {
            return {
                ...state,
                typeOperation: action.typeOperation,
            }
        }

        case SET_NUMBER: {

            if (!state.typeOperation) {
                const resultNumber2 = {number2: null, result: null}
                if (String(state.number + action.number).length > 14) {
                    return {
                        ...state,
                        number: state.number,
                        ...resultNumber2

                    }
                } else {
                    return (state.number === null || String(state.number) === "0" || state.number === "Не определено") ?
                        {...state, number: action.number, ...resultNumber2}
                        : {...state, number: state.number + action.number, ...resultNumber2}
                }
            }

            const resultNumber = {result: null, number: state.result}

            if (String(state.number2 + action.number).length > 14) {
                return state.result
                    ? {...state, number2: state.number2, ...resultNumber}
                    : {...state, number2: state.number2}
            } else {
                if (state.number2 === null || String(state.number2) === "0" || state.number2 === "Не определено") {
                    return state.result
                        ? {...state, number2: action.number, ...resultNumber}
                        : {...state, number2: action.number}
                }
                return state.result
                    ? {...state, number2: state.number2 + action.number, ...resultNumber}
                    : {...state, number2: state.number2 + action.number}
            }
        }


        case ADD_DOT: {

            const dot = String(state.number).includes(".") ? state.number : String(state.number) + "."
            const dot2 = String(state.number2).includes(".") ? state.number2 : String(state.number2) + "."

            return !state.typeOperation ? {...state, number: dot} : {...state, number2: dot2}

        }

        case RELOAD_NUMBER: {
            return {
                ...state,
                number: 0,
                number2: null,
                result: null,
                typeOperation: "",
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

export const makeOperation = () => (dispatch, getState) => {
    switch (getState().calculatorData.typeOperation) {
        case (PLUS): {
            dispatch(plusAction())
            break
        }
        case (MINUS): {
            dispatch(minusAction())
            break
        }
        case (DIVISION): {
            dispatch(divisionAction())
            break
        }
        case (MULTIPLICATION): {
            dispatch(multiplicationAction())
            break
        }
    }
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