import styles from "./Operators.module.scss"

const Operators = ({
                       operators, isEditMode, onDragStart, isActive, onDoubleClick,
                       onDragEnter, styleInactive, onDragEnd, onDragOver, onDrop, setTypeOperation
                   }) => {

    const isActiveOperators = isActive("operators")
    return (
        <div style={!isActiveOperators ? styleInactive : {}} className={styles.operators}
             id={"operators"} draggable={isEditMode && isActiveOperators}
             onDragEnter={onDragEnter ?? null} onDragOver={onDragOver ?? null}
             onDragStart={onDragStart} onDragEnd={onDragEnd ?? null}
             onDoubleClick={isEditMode ? onDoubleClick : null} onDrop={onDrop}>
            {
                operators.map(el => {
                    let typeOperation = ""
                    if (el === "+") {
                        typeOperation = "PLUS"
                    }
                    if (el === "-") {
                        typeOperation = "MINUS"
                    }
                    if (el === "/") {
                        typeOperation = "DIVISION"
                    }
                    if (el === "х") {
                        typeOperation = "MULTIPLICATION"
                    }
                    return <button type={"button"}
                                   onClick={isEditMode ? null : () => {
                                       setTypeOperation(typeOperation)}}
                                   className={styles.operators__operator}
                                   key={`operator + ${el}`}>{el}</button>

                })
            }
        </div>
    )
}

export default Operators;