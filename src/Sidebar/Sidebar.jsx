import styles from "./Sidebar.module.css"
import Display from "./Display/Display";
import Operators from "./Operators/Operators";
import Numbers from "./Numbers/Numbers";
import Equals from "./Equals/Equals";
import {connect} from "react-redux";
import {handleDragStart} from "../utils/handlersDnD";

const Sidebar = (props) => {


    return (
        <nav className={styles.sidebar}>
            <Display isEditMode={props.isEditMode} sidebarComponents={props.sidebarComponents} handleDragStart={handleDragStart}/>
            <Operators isEditMode={props.isEditMode} sidebarComponents={props.sidebarComponents} operators={props.operators} handleDragStart={handleDragStart}/>
            <Numbers isEditMode={props.isEditMode} sidebarComponents={props.sidebarComponents} numbers={props.numbers} handleDragStart={handleDragStart}/>
            <Equals isEditMode={props.isEditMode} sidebarComponents={props.sidebarComponents} handleDragStart={handleDragStart}/>
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