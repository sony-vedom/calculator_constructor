import styles from "./Canvas.module.css"
import React, {useState, useRef, useEffect} from "react"
import {ReactComponent as AddingElem} from "../assets/image/addingElem.svg"
import {connect} from "react-redux";
import Display from "../Sidebar/Display/Display";
import Operators from "../Sidebar/Operators/Operators";
import Numbers from "../Sidebar/Numbers/Numbers";
import Equals from "../Sidebar/Equals/Equals";
import {addCanvasComponents} from "../redux/constructorState";
import {mapStateToPropsFactory} from "react-redux/es/connect/mapStateToProps";
import {notInitialized} from "react-redux/es/utils/useSyncExternalStore";

const Canvas = ({addCanvasComponents, canvasComponents, numbers, operators}) => {


    const [components, setOrderComponents] = useState([...(canvasComponents.filter(el => el !== "display"))])

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        addCanvasComponents(e.dataTransfer.getData("text"))
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const dragItem = useRef()

    const dragOverItem = useRef()

    const dragStart = (i) => (e) => {
        dragItem.current = i;
    };

    const dragEnter = (i) => (e) => {
        dragOverItem.current = i;
    };
    const props = {
        isEditMode: true,
        numbers,
        operators,
        sidebarComponents: ["display", "operators", "numbers", "equals"],
        onDragEnter: null,
    }

    const [componentsList, setList] = useState([canvasComponents])

    useEffect(() => {
        setList(canvasComponents)
    }, [canvasComponents])

    const drop = (e) => {
        const copyListItems = [...componentsList];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };




    const Components = componentsList
        .sort(a => a === "display" ? -1 : 1)
        .reduce((acc, el, i) => {
            switch (el) {
                case "display": {
                    return [...acc, React.cloneElement(<Display/>, {...props, isEditMode: false, key: el}, null)]
                }
                case "operators": {
                    return [...acc, React.cloneElement(<Operators/>,
                        {
                            ...props,
                            handleDragStart: dragStart(i),
                            handleDragEnter: dragEnter(i),
                            key: el,
                            onDragEnd: drop,
                        }, null)]
                }
                case "numbers": {
                    return [...acc, React.cloneElement(<Numbers/>,
                        {
                            ...props,
                            handleDragStart: dragStart(i),
                            handleDragEnter: dragEnter(i),
                            onDragEnd: drop,

                            key: el
                        }, null)]
                }
                case "equals": {
                    return [...acc, React.cloneElement(<Equals/>, {
                        ...props,
                        handleDragStart: dragStart(i),
                        handleDragEnter: dragEnter(i),
                        onDragEnd: drop,
                        key: el
                    }, null)]
                }
                default: {
                    return acc
                }
            }
        }, [])
    return (
        <div className={styles.canvas} onDragOver={handleDragOver} onDrop={handleDrop}>
            {!!canvasComponents.length
                ? <>
                    {Components}
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
    )
}

const mapStateToProps = (state) => ({
    canvasComponents: state.constructorState.componentsLists.canvas,
    numbers: state.calculatorData.numbers,
    operators: state.calculatorData.operators,
})


export default connect(mapStateToProps, {addCanvasComponents})(Canvas);