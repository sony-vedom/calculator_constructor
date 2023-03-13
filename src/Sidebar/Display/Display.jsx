import styles from "./Display.module.css"
import React from "react";

const Display = ({isEditMode, onDragStart, isActive, styleInactive, onDoubleClick, number, number2, onDragEnd}) => {
    const isActiveDisplay = isActive("display")
    const outputNumber = () => {
        let resultNumber = 0;
        resultNumber = number2 !== "" ? number2 : number;
        resultNumber = resultNumber ? String(resultNumber).replace(".", ",") : "0"
        return resultNumber;
    }

    return (
        <div id={"display"} style={!isActiveDisplay ? styleInactive : {}} className={styles.display}
             draggable={isEditMode && isActiveDisplay}
             onDragStart={onDragStart}
             onDragEnd={onDragEnd ?? null}
             onDoubleClick={isEditMode ? onDoubleClick : null}>
            <div className={styles.display__value}>
                <p className={styles.display__value__text}>
                    {outputNumber()}
                </p>
            </div>
        </div>
    )
}

export default Display;