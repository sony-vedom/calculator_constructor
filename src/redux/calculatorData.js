const PLUS = "PLUS"
const MINUS = "MINUS"
const DEVISION = "DEVISION"


const initialState = {
    numbers: [",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    operators: ["/", "х", "-", "+"],
    output: 0,
}

const plusAction = (number) => ({
    type: PLUS
})

const calculatorData = (state = initialState) => state;

export default calculatorData;