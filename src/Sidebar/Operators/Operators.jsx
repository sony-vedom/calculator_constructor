import styles from "./Operators.module.css"
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";

const Operators = ({
                       operators, isEditMode, onDragStart, isActive, onDoubleClick, whereAddDnDIndex, onDragEnter,
                       styleInactive, onDragEnd, onDragOver, onDrop, setTypeOperation, isDragStartSideBarComponent
                   }) => {
    const isActiveOperators = isActive("operators")
    return (
        <>
            {whereAddDnDIndex === "above" ? <VectorDnD/> : null}
            <div style={!isActiveOperators ? styleInactive : (whereAddDnDIndex ? {marginTop: 0} : null)}
                 className={styles.operators}
                 id={"operators"} draggable={isEditMode && isActiveOperators}
                 onDragEnter={isDragStartSideBarComponent ? null : (onDragEnter ?? null)}
                 onDragOver={isDragStartSideBarComponent ? null : (onDragOver ?? null)}
                 onDragStart={onDragStart} onDragEnd={onDragEnd}
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
                        return <div className={styles.frame} key={`frameOperator +${el}`}>
                            <button type={"button"}
                                    onClick={isEditMode ? null : () => {
                                        setTypeOperation(typeOperation)
                                    }}
                                    className={isEditMode ? styles.operators__operator : styles.operators__operator_calcMode}
                                    key={`operator + ${el}`}>{el}</button>
                        </div>

                    })
                }

            </div>
            {whereAddDnDIndex === "under" ? <VectorDnD/> : null}
        </>
    )
}

export default Operators;