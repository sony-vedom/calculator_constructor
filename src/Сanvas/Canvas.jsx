import styles from "./Canvas.module.css"
import React, {useEffect, useRef, useState} from "react"
import {ReactComponent as AddingElem} from "../assets/image/addingElem.svg"
import {connect} from "react-redux";
import Display from "../Sidebar/Display/Display";
import Operators from "../Sidebar/Operators/Operators";
import Numbers from "../Sidebar/Numbers/Numbers";
import Equals from "../Sidebar/Equals/Equals";
import {addCanvasComponents, deleteCanvasComponents} from "../redux/constructorState";
import classNames from "classnames";
import handlersDnD from "../utils/handlersDnD";
import {ReactComponent as VectorDnD} from "../assets/image/vector.svg";
import {makeOperation, setTypeOperation, addDot, setNumber} from "../redux/calculatorData";


const Canvas = ({
                    addCanvasComponents, canvasComponents, numbers, operators, deleteCanvasComponents,
                    isEditMode, makeOperation, setTypeOperation, setNumber, number, addDot, number2
                }) => {
    const [isDragOver, setDragover] = useState(false);
    const [componentsList, setList] = useState([canvasComponents.filter(el => !!el)])
    const [whereAddDnD, setWhereAddDnD] = useState("")
    const [indexDragOver, setIndexDragOver] = useState(null)

    useEffect(() => {
        setList(canvasComponents)
    }, [canvasComponents])

    const dragItem = useRef()
    const dragOverItem = useRef()


    const props = {
        isEditMode,
        numbers,
        operators,
        isActive: (componentName) => componentName !== "display",
        styleInactive: {},
        onDragOver: handlersDnD.handleDragOver(),
        onDragEnd: handlersDnD.handleDragEndCanvasComponents(componentsList, dragItem, dragOverItem, setList, setWhereAddDnD),
        onDoubleClick: (e) => {
            deleteCanvasComponents(e.currentTarget.id)
        },

        setTypeOperation: setTypeOperation,
        makeOperation,
    }

    const onDrop = () => () => {
        setList(componentsList.filter(el => el !== "vector"))
        setWhereAddDnD("")
    }

    const onDragEnter = (i) => (e) => {
        dragOverItem.current = i;
        setIndexDragOver(dragOverItem.current)
        if (dragItem.current !== dragOverItem.current) {
            if (dragItem.current > dragOverItem.current) {
                setWhereAddDnD("above")
            }

            if (dragItem.current < dragOverItem.current) {
                setWhereAddDnD("under")

            }
        }
    }


    const Components = componentsList
        .sort(a => a === "display" ? -1 : 1)
        .reduce((acc, el, i) => {
            let whereAddDnDIndex = ""
            if (indexDragOver === i) {
                whereAddDnDIndex = whereAddDnD
            }

            const endStartKey = {
                onDragStart: handlersDnD.handleDragStartCanvasComponents(i, dragItem),
                onDragEnter: onDragEnter(i),
                onDrop: onDrop,
                key: el,
            }
            switch (el) {
                case "display": {
                    return [...acc, React.cloneElement(<Display/>,
                        {
                            ...props,
                            key: endStartKey.key,
                            styleInactive: {cursor: "not-allowed"},
                            number, number2,  whereAddDnDIndex,
                        }, "div")]
                }
                case "operators": {
                    return [...acc, React.cloneElement(<Operators/>,
                        {...props, ...endStartKey, whereAddDnDIndex}, null)]
                }
                case "numbers": {
                    return [...acc, React.cloneElement(<Numbers/>,
                        {...props, ...endStartKey, addDot, setNumber, whereAddDnDIndex}, null)]
                }
                case "equals": {
                    return [...acc, React.cloneElement(<Equals/>,
                        {...props, ...endStartKey, whereAddDnDIndex}, null)]
                }
                case "vector": {
                    return [...acc, <VectorDnD/>]
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
            onDrop={handlersDnD.handleDrop(addCanvasComponents, setDragover, setList, componentsList)}>
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
    isEditMode: state.constructorState.isEditMode,
    number: state.calculatorData.number,
    number2: state.calculatorData.number2,
})


export default connect(mapStateToProps, {
    addCanvasComponents,
    deleteCanvasComponents,
    makeOperation,
    setTypeOperation,
    setNumber,
    addDot
})(Canvas);