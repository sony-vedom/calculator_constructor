import styles from "./Equals.module.scss"

const Equals = ({isEditMode, handleDragStart, ...props}) => {

    return (
        <div className={styles.equals} id={"equals"}
             draggable={isEditMode && props.sidebarComponents.includes("equals")}
             onDragStart={handleDragStart} onDragEnter={props.handleDragEnter ?? null}
             onDragOver={(e) => e.preventDefault()}
             onDragEnd={props.onDragEnd ?? null}>
            <button className={styles.equals__operator}>=</button>
        </div>
    )
}


export default Equals;