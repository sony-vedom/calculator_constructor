import styles from "./Display.module.css"
import React from "react";

const Display = ({isEditMode, onDragStart, isActive, styleInactive, onDoubleClick, number, number2, onDragEnd}) => {
    const isActiveDisplay = isActive("display")
    const outputValue = () => {
        let result = 0;
        result = number2 !== "" ? number2 : number;
        result = result ? String(result).replace(".", ",") : "0"
        return result;
    }

    const fontSize = () => {
        const value = outputValue();
        if (value.length<8) return "36px";
        if(value.length>13) return "19px";
        return "24px";
    }

    return (
        <div id={"display"} style={!isActiveDisplay ? styleInactive : {}} className={styles.display}
             draggable={isEditMode && isActiveDisplay}
             onDragStart={onDragStart}
             onDragEnd={onDragEnd ?? null}
             onDoubleClick={isEditMode ? onDoubleClick : null}>
            <div className={styles.display__value}>
                <p className={styles.display__value__text} style={{fontSize: fontSize()}}>
                    {outputValue()}
                </p>
            </div>
        </div>
    )
}

export default Display;