import styles from "./Operators.module.css"
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";

const Operators = ({
                       operators, isEditMode, onDragStart, isActive, onDoubleClick, whereAddDnDIndex, onDragEnter, makeOperation,
                       styleInactive, onDragEnd, onDragOver, onDrop, setTypeOperation, isDragStartSideBarComponent, number, number2,
                   }) => {
    const isActiveOperators = isActive("operators")
    return (
        <>
            {whereAddDnDIndex === "above" ? <VectorDnD/> : null}
            <div style={!isActiveOperators ? styleInactive : (whereAddDnDIndex ? {marginTop: 0} : null)}
                 className={isEditMode ? styles.operators_move : styles.operators}
                 id={"operators"} draggable={isEditMode && isActiveOperators}
                 onDragEnter={isDragStartSideBarComponent ? null : (onDragEnter ?? null)}
                 onDragOver={isDragStartSideBarComponent ? null : (onDragOver ?? null)}
                 onDragStart={onDragStart} onDragEnd={onDragEnd}
                 onDoubleClick={isEditMode ? onDoubleClick : null} onDrop={onDrop}>
                {
                    operators.map(el => {
                        let typeOperation = ""
                        switch (el) {
                            case "+": {
                                typeOperation = "PLUS"
                                break
                            }
                            case "-": {
                                typeOperation = "MINUS"
                                break
                            }
                            case "/": {
                                typeOperation = "DIVISION"
                                break
                            }
                            case "х": {
                                typeOperation = "MULTIPLICATION"
                                break
                            }
                            default: {
                                break
                            }
                        }
                        return <div className={styles.frame} key={`frameOperator +${el}`}>
                            <button type={"button"}
                                    onClick={isEditMode ? null : () => {
                                        number !== null && number2 !== null && makeOperation()
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