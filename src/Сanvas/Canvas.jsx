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

const Canvas = ({addCanvasComponents, canvasComponents, numbers, operators, deleteCanvasComponents, isEditMode}) => {

    const [isDragOver, setDragover] = useState(false);
    const [componentsList, setList] = useState([canvasComponents.filter(el => !!el)])

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
        onDragEnd: handlersDnD.handleDragEndCanvasComponents(componentsList, dragItem, dragOverItem, setList),
        onDoubleClick: (e) => {
            deleteCanvasComponents(e.currentTarget.id)
        },
    }

    const onDrop = () => (e) => {
       setList( componentsList.filter(el => el !== "vector"))
    }

    const onDragEnter = (i) => (e) => {

        dragOverItem.current = i;
        const list = componentsList.filter(el => el !== "vector" && !!el);
        setList(list)
        if (dragItem.current !== dragOverItem.current && !(componentsList.includes("vector"))) {
            if (dragItem.current > dragOverItem.current) {
                list.splice(dragOverItem.current, 0, "vector")
                setList(list)
            }

            if (dragItem.current < dragOverItem.current) {
                list.splice(dragOverItem.current + 1, 0, "vector")
                setList(list)

            }
        }
    }



   const onDragStart = (i) => (e) => {
        dragItem.current = i;
    }
    // console.log(componentsList)


    const Components = componentsList
        .sort(a => a === "display" ? -1 : 1)
        .reduce((acc, el, i) => {

            const endStartKey = {
                onDragStart: onDragStart(i),
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
                        }, "div")]
                }
                case "operators": {
                    return [...acc, React.cloneElement(<Operators/>,
                        {...props, ...endStartKey, dragItem: handlersDnD.dragItem}, null)]
                }
                case "numbers": {
                    return [...acc, React.cloneElement(<Numbers/>,
                        {...props, ...endStartKey,}, null)]
                }
                case "equals": {
                    return [...acc, React.cloneElement(<Equals/>,
                        {...props, ...endStartKey}, null)]
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
})


export default connect(mapStateToProps, {addCanvasComponents, deleteCanvasComponents})(Canvas);