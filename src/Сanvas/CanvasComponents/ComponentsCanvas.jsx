import handlersDnD from "../../utils/handlersDnD";
import Display from "../../Sidebar/Display/Display";
import Operators from "../../Sidebar/Operators/Operators";
import Numbers from "../../Sidebar/Numbers/Numbers";
import Equals from "../../Sidebar/Equals/Equals";
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";
import React, {useRef, useState} from "react"

const ComponentsCanvas = ({
                              componentsList, isEditMode, numbers,
                              operators, deleteCanvasComponents, setList,
                              addDot, setNumber, setTypeOperation,
                              makeOperation, isDragOver, isDragStartSideBarComponent,
                              number, number2, result,
                          }) => {
    const [whereAddDnD, setWhereAddDnD] = useState("")
    const [indexDragOver, setIndexDragOver] = useState(null)

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
        setTypeOperation,
        makeOperation,
        isDragOver,
        isDragStartSideBarComponent,
    }

    const Components = componentsList
        .sort(a => a === "display" ? -1 : 1)
        .reduce((acc, el, i) => {
            let whereAddDnDIndex = ""
            if (indexDragOver === i && indexDragOver !== dragItem.current) {
                whereAddDnDIndex = whereAddDnD
            }
            const propsForDndComponents = {
                onDragStart: handlersDnD.handleDragStartCanvasComponents(i, dragItem),
                onDragEnter: handlersDnD.handleDragEnterCanvasComponents(i, dragOverItem, dragItem, setWhereAddDnD,setIndexDragOver),
                onDrop: handlersDnD.handleDropCanvasComponents(setWhereAddDnD),
                key: el,
            }
            switch (el) {
                case "display": {
                    return [...acc, React.cloneElement(<Display/>,
                        {
                            ...props,
                            key: el,
                            styleInactive: {cursor: "not-allowed"},
                            number, number2, result, whereAddDnDIndex,
                        }, "div")]
                }
                case "operators": {
                    return [...acc, React.cloneElement(<Operators/>,
                        {...props, number, number2, ...propsForDndComponents, whereAddDnDIndex}, null)]
                }
                case "numbers": {
                    return [...acc, React.cloneElement(<Numbers/>,
                        {...props, ...propsForDndComponents, addDot, setNumber, whereAddDnDIndex}, null)]
                }
                case "equals": {
                    return [...acc, React.cloneElement(<Equals/>,
                        {...props, ...propsForDndComponents, whereAddDnDIndex}, null)]
                }
                case "vector": {
                    return [...acc, <VectorDnD/>]
                }
                default: {
                    return acc
                }
            }
        }, [])

    return <>{Components}</>
}

export default ComponentsCanvas;