const ENABLE_CONSTRUCTOR_MODE = "ENABLE_CONSTRUCTOR_MODE"
const ADD_SIDEBAR_COMPONENT = "ADD_SIDEBAR_COMPONENT"
const ADD_CANVAS_COMPONENT = "ADD_CANVAS_COMPONENT"
const RELOAD_CONSTRUCTOR_MODE = "RELOAD_CONSTRUCTOR_MODE"

const initialState = {
    isEditMode: true,
    componentsLists: {
        sidebar: ["display", "operators", "numbers", "equals"],
        canvas: []
    }
}

const constructorState = (state = initialState, action) => {
    switch (action.type) {
        case ENABLE_CONSTRUCTOR_MODE: {
            return {
                ...state,
                isEditMode: action.isConstructorMode,
            }
        }
        case ADD_CANVAS_COMPONENT: {

            return {
                ...state,
                componentsLists: {
                    sidebar: state.componentsLists.sidebar.filter(el => el !== action.component),
                    canvas: [...state.componentsLists.canvas, action.component]
                }
            }
        }
        case RELOAD_CONSTRUCTOR_MODE: {
            return {
                ...state,
                componentsLists: {
                    sidebar: ["display", "operators", "numbers", "equals"],
                    canvas: []
                }
            }
        }

        default:
            return state;
    }
}

export const enableConstructorMode = (isConstructorMode) => ({
    type: ENABLE_CONSTRUCTOR_MODE,
    isConstructorMode
})

export const reloadConstructorMode = () => ({
    type: RELOAD_CONSTRUCTOR_MODE,
})

export const addCanvasComponents = (component) => ({
    type: ADD_CANVAS_COMPONENT,
    component
})


export default constructorState;