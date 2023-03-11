import styles from "./Display.module.css"
import React from "react";

const Display = ({isEditMode, onDragStart, isActive, styleInactive}) => {
    const isActiveDisplay = isActive("display")
    return (
        <div id={"display"} style={!isActiveDisplay ? styleInactive : {}} className={styles.display}
             draggable={isEditMode && isActiveDisplay}
             onDragStart={onDragStart}>
            <div className={styles.display__value}>
                <p className={styles.display__value__text}>0</p>
            </div>
        </div>
    )
}

export default Display;