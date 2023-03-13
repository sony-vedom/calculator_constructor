import styles from "./Sidebar.module.css"
import Display from "./Display/Display";
import Operators from "./Operators/Operators";
import Numbers from "./Numbers/Numbers";
import Equals from "./Equals/Equals";
import {connect} from "react-redux";
import handlersDnD from "../utils/handlersDnD";

const Sidebar = ({sidebarComponents, isEditMode, ...props}) => {
    const isActive = componentName => sidebarComponents.includes(`${componentName}`)
    const styleInactive = {boxShadow: "none", cursor: "default", opacity: "50%"}
    const onDragStart = handlersDnD.handleDragStartSidebarComponents
    return (
        <nav className={styles.sidebar} style={isEditMode ? {} : {display: "none"}}>
            <Display styleInactive={styleInactive} isEditMode={isEditMode} isActive={isActive}
                     onDragStart={onDragStart}/>
            <Operators styleInactive={styleInactive} isEditMode={isEditMode}
                       isActive={isActive} operators={props.operators} onDragStart={onDragStart}/>
            <Numbers styleInactive={styleInactive} isEditMode={isEditMode} isActive={isActive} numbers={props.numbers}
                     onDragStart={onDragStart}/>
            <Equals styleInactive={styleInactive} isEditMode={isEditMode} isActive={isActive}
                    onDragStart={onDragStart}/>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    numbers: state.calculatorData.numbers,
    operators: state.calculatorData.operators,
    isEditMode: state.constructorState.isEditMode,
    sidebarComponents: state.constructorState.componentsLists.sidebar,


})
export default connect(mapStateToProps, {})(Sidebar);