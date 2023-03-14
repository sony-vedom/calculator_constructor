import styles from "./Canvas.module.css"
import React, {useEffect, useState} from "react"
import {ReactComponent as AddingElem} from "../assets/image/addingElem.svg"
import {connect} from "react-redux";
import {addCanvasComponents, deleteCanvasComponents} from "../redux/constructorState";
import classNames from "classnames";
import handlersDnD from "../utils/handlersDnD";
import {ReactComponent as VectorDnD} from "../assets/image/vector.svg";
import {addDot, makeOperation, setNumber, setTypeOperation} from "../redux/calculatorData";
import ComponentsCanvas from "./CanvasComponents/ComponentsCanvas";


const Canvas = ({
                    addCanvasComponents, canvasComponents, isDragStartSideBarComponent,
                    isDragStartSideBarComponentDisplay, isEditMode, ...props
                }) => {
    const [isDragOver, setDragover] = useState(false);
    const [componentsList, setList] = useState([canvasComponents])

    useEffect(() => {
        setList(canvasComponents)
    }, [canvasComponents])

    return (
        isEditMode || componentsList.length
            ? <div
                style={(isDragOver && !componentsList.length) ? {background: "#F0F9FF"} : {background: "none"}}
                className={canvasComponents.length ? classNames(styles.canvas, styles.canvas__autoDropEffect) : styles.canvas}
                onDragOver={handlersDnD.handleDragOver(setDragover)}
                onDrop={handlersDnD.handleDrop(addCanvasComponents, setDragover)}
            >
                {!!componentsList.length
                    ? <>
                        {isDragStartSideBarComponentDisplay && isDragOver ? <VectorDnD/> : null}
                        <ComponentsCanvas setList={setList} componentsList={componentsList} isDragOver={isDragOver}
                                          isDragStartSideBarComponent={isDragStartSideBarComponent} isEditMode={isEditMode}
                                          {...props}/>
                        {isDragStartSideBarComponent && !isDragStartSideBarComponentDisplay && isDragOver ?
                            <VectorDnD/> : null}
                    </>
                    : <div className={styles.canvas__addingElem}>
                        <div>
                            <AddingElem className={styles.canvas__addingElem__pic}/>
                        </div>
                        <p className={styles.canvas__addingElem__text__bold}>Перетащите сюда</p>
                        <p className={styles.canvas__addingElem__text__normal}>любой элемент из левой панели</p>
                    </div>
                }
            </div>
            : <></>
    )
}

const mapStateToProps = (state) => ({
    canvasComponents: state.constructorState.componentsLists.canvas,
    numbers: state.calculatorData.numbers,
    operators: state.calculatorData.operators,
    isEditMode: state.constructorState.isEditMode,
    number: state.calculatorData.number,
    number2: state.calculatorData.number2,
    result: state.calculatorData.result,
    isDragStartSideBarComponent: state.constructorState.isDragStartSideBarComponent,
    isDragStartSideBarComponentDisplay: state.constructorState.isDragStartSideBarComponentDisplay,
})


export default connect(mapStateToProps, {
    addCanvasComponents,
    deleteCanvasComponents,
    makeOperation,
    setTypeOperation,
    setNumber,
    addDot
})(Canvas);