import styles from "./Display.module.css"
import React, {useRef, useState} from "react";

const Display = ({isEditMode, handleDragStart, ...props}) => {
    return (
        <div id={"display"} className={styles.display} draggable={isEditMode && props.sidebarComponents.includes("display")}
             onDragStart={handleDragStart}>
            <div className={styles.display__value}>
                <p className={styles.display__value__text}>0</p>
            </div>
        </div>
    )
}

export default Display;