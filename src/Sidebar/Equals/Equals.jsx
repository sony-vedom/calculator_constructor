import styles from "./Equals.module.scss"

const Equals = ({isEditMode, onDragStart, isActive, styleInactive, onDrop,
                    onDragOver, onDragEnter, onDragEnd, onDoubleClick, }) => {
    const isActiveEquals = isActive("equals")
    return (
        <div style={!isActiveEquals ? styleInactive : {}}
             className={styles.equals} id={"equals"}
             draggable={isEditMode && isActiveEquals}
             onDragStart={onDragStart}
             onDragEnter={onDragEnter ?? null}
             onDragOver={onDragOver ?? null}
             onDragEnd={onDragEnd ?? null}
             onDoubleClick={isEditMode ? onDoubleClick : null}  onDrop={onDrop}>
            <button className={styles.equals__operator}>=</button>
        </div>
    )
}


export default Equals;