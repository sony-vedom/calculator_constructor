import styles from "./Numbers.module.css";
import {ReactComponent as VectorDnD} from "../../assets/image/vector.svg";


const Numbers = ({
                     numbers, isEditMode, onDragStart, isActive, onDoubleClick, onDrop, whereAddDnDIndex,
                     styleInactive, onDragOver, onDragEnter, onDragEnd, setNumber, addDot
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
            { whereAddDnDIndex === "above" ? <VectorDnD/> : null}
            <div style={!isActiveNumbers ? styleInactive : (whereAddDnDIndex ? {marginTop: 0} : null)}
                 className={styles.numbers} id={"numbers"}
                 draggable={isEditMode && isActiveNumbers}
                 onDragEnter={onDragEnter ?? null}
                 onDragStart={onDragStart}
                 onDragOver={onDragOver ?? null}
                 onDragEnd={onDragEnd ?? null}
                 onDoubleClick={isEditMode ? onDoubleClick : null} onDrop={onDrop}>

                {
                    myReverseNumber.map((el) => <button type={"button"} onClick={isEditMode ? null : () => {
                        setNumber(el)
                    }} key={`number+${el}`}>{el}</button>)
                }
                <button onClick={isEditMode ? null : () => {
                    addDot()
                }}>,
                </button>
            </div>
            { whereAddDnDIndex === "under" ? <VectorDnD/> : null}
        </>
    )
}

export default Numbers;