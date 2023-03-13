import styles from "./Sidebar.module.css"
import Display from "./Display/Display";
import Operators from "./Operators/Operators";
import Numbers from "./Numbers/Numbers";
import Equals from "./Equals/Equals";
import {connect} from "react-redux";
import handlersDnD from "../utils/handlersDnD";
import {isDragStartSideBarComponents} from "../redux/constructorState";

const Sidebar = ({sidebarComponents, isEditMode, isDragStartSideBarComponents, ...props}) => {
    const isActive = componentName => sidebarComponents.includes(`${componentName}`)
    const styleInactive = {boxShadow: "none", cursor: "default", opacity: "50%"}
    const onDragStart = handlersDnD.handleDragStartSidebarComponents(isDragStartSideBarComponents)
    const onDragEnd = handlersDnD.handleDragEndSidebarComponents(isDragStartSideBarComponents)
    return (
        <nav className={styles.sidebar} style={isEditMode ? {} : {display: "none"}}>
            <Display styleInactive={styleInactive} isEditMode={isEditMode} isActive={isActive}
                     onDragStart={onDragStart} onDragEnd={onDragEnd}/>
            <Operators styleInactive={styleInactive} isEditMode={isEditMode}
                       isActive={isActive} operators={props.operators} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
            <Numbers styleInactive={styleInactive} isEditMode={isEditMode} isActive={isActive} numbers={props.numbers}
                     onDragStart={onDragStart} onDragEnd={onDragEnd}/>
            <Equals styleInactive={styleInactive} isEditMode={isEditMode} isActive={isActive}
                    onDragStart={onDragStart} onDragEnd={onDragEnd}/>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    numbers: state.calculatorData.numbers,
    operators: state.calculatorData.operators,
    isEditMode: state.constructorState.isEditMode,
    sidebarComponents: state.constructorState.componentsLists.sidebar,

})
export default connect(mapStateToProps, {isDragStartSideBarComponents})(Sidebar);