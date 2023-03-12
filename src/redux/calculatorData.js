const PLUS = "PLUS" // +
const MINUS = "MINUS" // -
const DIVISION = "DIVISION" // /
const MULTIPLICATION = "MULTIPLICATION" // *
const SET_INITIAL_NUMBER = "SET_INITIAL_NUMBER"

const initialState = {
    numbers: [",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    operators: ["/", "х", "-", "+"],
    initialNumber: 0,
}

const calculatorData = (state = initialState, action) => {
    switch (action.type) {
        case PLUS: {
            return {
                ...state,
                initialNumber: state.initialNumber + action.number
            }
        }
        case MINUS: {
            return {
                ...state,
                initialNumber: state.initialNumber - action.number
            }
        }

        case DIVISION: {
            return {
                ...state,
                initialNumber: state.initialNumber / action.number
            }
        }

        case MULTIPLICATION: {
            return {
                ...state,
                initialNumber: state.initialNumber * action.number
            }
        }

        default: {
            return state
        }
    }
}

const setInitialNumber = (number) => ({
    type: SET_INITIAL_NUMBER,
    number
})

const plusAction = (number) => ({
    type: PLUS,
    number
})

const minusAction = (number) => ({
    type: MINUS,
    number
})

const divisionAction = (number) => ({
    type: DIVISION,
    number
})

const multiplicationAction = (number) => ({
    type: MULTIPLICATION,
    number
})


export default calculatorData;