import styles from "./Canvas.module.css"
import React, {useEffect, useRef, useState} from "react"
import {ReactComponent as AddingElem} from "../assets/image/addingElem.svg"
import {connect} from "react-redux";
import Display from "../Sidebar/Display/Display";
import Operators from "../Sidebar/Operators/Operators";
import Numbers from "../Sidebar/Numbers/Numbers";
import Equals from "../Sidebar/Equals/Equals";
import {addCanvasComponents} from "../redux/constructorState";
import classNames from "classnames";
import handlersDnD from "../utils/handlersDnD";

const Canvas = ({addCanvasComponents, canvasComponents, numbers, operators}) => {
    const [isDragOver, setDragover] = useState(false);
    const [componentsList, setList] = useState([canvasComponents])

    useEffect(() => {
        setList(canvasComponents)
    }, [canvasComponents])

    const dragItem = useRef()
    const dragOverItem = useRef()

    const props = {
        isEditMode: true,
        numbers,
        operators,
        isActive: (componentName) => componentsList.includes(`${componentName}`),
        styleInactive: {},
        onDragOver: handlersDnD.handleDragOver(),
        onDragEnd: handlersDnD.handleDragEndCanvasComponents(componentsList, dragItem, dragOverItem, setList),
    }

    const Components = componentsList
        .sort(a => a === "display" ? -1 : 1)
        .reduce((acc, el, i) => {
            const endStartKey = {
                onDragStart: handlersDnD.handleDragStartCanvasComponents(i, dragItem),
                onDragEnter: handlersDnD.handleDragEnterCanvasComponents(i, dragOverItem),
                key: el,
            }
            switch (el) {
                case "display": {
                    return [...acc, React.cloneElement(<Display/>,
                        {...props, isEditMode: false, key: el}, null)]
                }
                case "operators": {
                    return [...acc, React.cloneElement(<Operators/>,
                        {...props, ...endStartKey,}, null)]
                }
                case "numbers": {
                    return [...acc, React.cloneElement(<Numbers/>,
                        {...props, ...endStartKey,}, null)]
                }
                case "equals": {
                    return [...acc, React.cloneElement(<Equals/>,
                        {...props, ...endStartKey}, null)]
                }
                default: {
                    return acc
                }
            }
        }, [])
    return (
        <div
            style={isDragOver && !canvasComponents.length ? {background: "#F0F9FF"} : {background: "none"}}
            className={canvasComponents.length ? classNames(styles.canvas, styles.canvas__autoDropEffect) : styles.canvas}
            onDragOver={handlersDnD.handleDragOver(setDragover)}
            onDrop={handlersDnD.handleDrop(addCanvasComponents, setDragover)}>
            {!!componentsList.length
                ? <>{Components}</>
                : <div className={styles.canvas__addingElem}>
                    <div>
                        <AddingElem className={styles.canvas__addingElem__pic}/>
                    </div>
                    <p className={styles.canvas__addingElem__text__bold}>Перетащите сюда</p>
                    <p className={styles.canvas__addingElem__text__normal}>любой элемент из левой панели</p>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    canvasComponents: state.constructorState.componentsLists.canvas,
    numbers: state.calculatorData.numbers,
    operators: state.calculatorData.operators,
})


export default connect(mapStateToProps, {addCanvasComponents})(Canvas);