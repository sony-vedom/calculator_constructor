import styles from "./Operators.module.scss"

const Operators = ({operators, isEditMode, handleDragStart, ...props}) => {
    return (
        <div className={styles.operators} id={"operators"}
             draggable={isEditMode && props.sidebarComponents.includes("operators")}
             onDragEnter={props.handleDragEnter ?? null}
             onDragOver={(e) => e.preventDefault()}
             onDragStart={handleDragStart} onDragEnd={props.onDragEnd ?? null}>
            {
                operators.map((el, index) => <button type={"button"}
                                                     className={styles.operators__operator}
                                                     key={`operator + ${el}`}>{el}</button>)
            }
        </div>
    )
}

export default Operators;