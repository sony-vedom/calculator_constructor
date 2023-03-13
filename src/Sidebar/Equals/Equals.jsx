import styles from "./Equals.module.scss"
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";

const Equals = ({isEditMode, onDragStart, isActive, styleInactive, onDrop, whereAddDnDIndex,
                    onDragOver, onDragEnter, onDragEnd, onDoubleClick, makeOperation}) => {
    const isActiveEquals = isActive("equals")
    return (
        <>
            { whereAddDnDIndex === "above" ? <VectorDnD/> : null}
        <div style={!isActiveEquals ? styleInactive : (whereAddDnDIndex ? {marginTop: 0} : null)}
             className={styles.equals} id={"equals"}
             draggable={isEditMode && isActiveEquals}
             onDragStart={onDragStart}
             onDragEnter={onDragEnter ?? null}
             onDragOver={onDragOver ?? null}
             onDragEnd={onDragEnd ?? null}
             onDoubleClick={isEditMode ? onDoubleClick : null}
             onDrop={onDrop}
             onClick={() => {makeOperation()}}
        >
            <button className={styles.equals__operator}>=</button>
        </div>
            { whereAddDnDIndex === "under" ? <VectorDnD/> : null}
        </>
    )
}


export default Equals;