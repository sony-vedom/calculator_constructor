import styles from "./Display.module.css"
import React from "react";

const Display = ({isEditMode, onDragStart, isActive, styleInactive, onDoubleClick, number, number2, result, onDragEnd}) => {
    const isActiveDisplay = isActive("display")
    const outputValue = () => {
        let outputValue = 0;
        outputValue = result ?? number2 ?? number;
        outputValue = outputValue ? String(outputValue).replace(".", ",") : "0"
        return outputValue;
    }

    const fontSize = () => {
        const value = outputValue();
        if(value.length>14) return "14px";
        if (value.length<8) return "36px";
        if(value.length>13) return "19px";
        return "24px";
    }

    return (
        <div id={"display"} style={ isEditMode ?(!isActiveDisplay ? styleInactive : {}) : {cursor: "default"}}
             className={styles.display}
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