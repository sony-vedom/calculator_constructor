const ENABLE_CONSTRUCTOR_MODE = "ENABLE_CONSTRUCTOR_MODE"
const ADD_CANVAS_COMPONENT = "ADD_CANVAS_COMPONENT"
const DELETE_CANVAS_COMPONENT = "DELETE_CANVAS_COMPONENT"
const RELOAD_CONSTRUCTOR_MODE = "RELOAD_CONSTRUCTOR_MODE"
const IS_DRAGSTART_SIDEBAR_COMPONENTS = "IS_DRAGSTART_SIDEBAR_COMPONENTS"

const initialState = {
    isEditMode: true,
    componentsLists: {
        sidebar: ["display", "operators", "numbers", "equals"],
        canvas: []
    },
    isDragStartSideBarComponent: false,
    isDragStartSideBarComponentDisplay: false,
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
        case DELETE_CANVAS_COMPONENT: {
            return {
                ...state,
                componentsLists: {
                    sidebar: [...state.componentsLists.sidebar, action.component],
                    canvas: state.componentsLists.canvas.filter(el => el !== action.component)
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

        case IS_DRAGSTART_SIDEBAR_COMPONENTS: {
            return {
                ...state,
                isDragStartSideBarComponent: action.booleanValue,
                isDragStartSideBarComponentDisplay: action.booleanValueDisplay,

            }
        }

        default:
            return state;
    }
}

export const isDragStartSideBarComponents = (booleanValue, booleanValueDisplay) => ({
    type: IS_DRAGSTART_SIDEBAR_COMPONENTS,
    booleanValue,
    booleanValueDisplay
})


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

export const deleteCanvasComponents = (component) => {
    return {
        type: DELETE_CANVAS_COMPONENT,
        component
    }
}

export default constructorState;