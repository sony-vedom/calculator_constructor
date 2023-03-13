import styles from "./Numbers.module.css";
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";


const Numbers = ({
                     numbers, isEditMode, onDragStart, isActive, onDoubleClick, onDrop, whereAddDnDIndex, styleInactive,
                     onDragOver, onDragEnter, onDragEnd, setNumber, addDot, isDragStartSideBarComponent
                 }) => {
    const isActiveNumbers = isActive("numbers")
    const myReverseNumber = [...numbers].reverse().reduce((acc, el, i) => {
        if ((i + 1) % 3 === 0) {
            const x = el
            acc[i] = acc[i - 2]
            acc[i - 2] = x
            return acc
        }
        return [...acc, el]
    }, [])

    return (
        <>
            {whereAddDnDIndex === "above" ? <VectorDnD/> : null}
            <div style={!isActiveNumbers ? styleInactive : (whereAddDnDIndex ? {marginTop: 0} : null)}
                 className={styles.numbers} id={"numbers"}
                 draggable={isEditMode && isActiveNumbers}
                 onDragEnter={isDragStartSideBarComponent ? null : (onDragEnter ?? null)}
                 onDragOver={isDragStartSideBarComponent ? null : (onDragOver ?? null)}
                 onDragStart={onDragStart}
                 onDragEnd={onDragEnd}
                 onDoubleClick={isEditMode ? onDoubleClick : null} onDrop={onDrop}>

                {
                    myReverseNumber.map((el) => <div className={styles.frame} key={`frameNumber+${el}`}>
                        <button key={`number+${el}`} type={"button"} onClick={isEditMode ? null : () => setNumber(el)}
                                className={isEditMode ? styles.numbers__buttons : styles.number__buttons_calcMode}>{el}</button>
                    </div>)
                }
                <div className={styles.frame}>
                    <button className={isEditMode ? styles.numbers__buttons : styles.number__buttons_calcMode}
                            onClick={isEditMode ? null : () => addDot()}>,
                    </button>
                </div>
            </div>
            {whereAddDnDIndex === "under" ? <VectorDnD/> : null}
        </>
    )
}

export default Numbers;