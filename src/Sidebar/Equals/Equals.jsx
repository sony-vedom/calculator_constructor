import styles from "./Equals.module.scss"
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";

const Equals = ({isEditMode, onDragStart, isActive, styleInactive, onDrop, whereAddDnDIndex, onDragOver,
                    onDragEnter, onDragEnd, onDoubleClick, makeOperation, isDragStartSideBarComponent}) => {
    const isActiveEquals = isActive("equals")
    return (
        <>
            { whereAddDnDIndex === "above" ? <VectorDnD/> : null}
        <div style={!isActiveEquals ? styleInactive : (whereAddDnDIndex ? {marginTop: 0} : null)}
             className={isEditMode ? styles.equals : styles.equals_calcMode} id={"equals"}
             draggable={isEditMode && isActiveEquals}
             onDragStart={onDragStart}
             onDragEnter={isDragStartSideBarComponent ? null : (onDragEnter ?? null)}
             onDragOver={isDragStartSideBarComponent ? null : (onDragOver ?? null)}
             onDragEnd={onDragEnd}
             onDoubleClick={isEditMode ? onDoubleClick : null}
             onDrop={onDrop}
             onClick={makeOperation ? () => {makeOperation()} : null}
        >
            <button className={styles.equals__operator}>=</button>
        </div>
            { whereAddDnDIndex === "under" ? <VectorDnD/> : null}
        </>
    )
}


export default Equals;