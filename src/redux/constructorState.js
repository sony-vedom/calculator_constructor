const ENABLE_CONSTRUCTOR_MODE = "ENABLE_CONSTRUCTOR_MODE"
const ADD_SIDEBAR_COMPONENT = "ADD_SIDEBAR_COMPONENT"
const ADD_CANVAS_COMPONENT = "ADD_CANVAS_COMPONENT"

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
        case ADD_SIDEBAR_COMPONENT: {
            return {
                ...state,
                componentsLists: {
                    sidebar: [...state.componentsLists.sidebar, action.component],
                    canvas: state.componentsLists.canvas.filter(el => el !== action.component),
                }
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

        default:
            return state;
    }
}

export const enableConstructorMode = (isConstructorMode) => ({
    type: ENABLE_CONSTRUCTOR_MODE,
    isConstructorMode
})

export const addSidebarComponents = (component) => ({
    type: ADD_SIDEBAR_COMPONENT,
    component
})

export const addCanvasComponents = (component) => ({
    type: ADD_CANVAS_COMPONENT,
    component
})


export default constructorState;