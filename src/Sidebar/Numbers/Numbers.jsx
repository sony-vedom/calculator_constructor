import styles from "./Numbers.module.scss"

const Numbers = ({numbers, isEditMode, onDragStart, isActive, onDoubleClick,onDrop,
                     styleInactive, onDragOver,onDragEnter, onDragEnd}) => {
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
        <div style={!isActiveNumbers ? styleInactive : {}}
            className={styles.numbers} id={"numbers"}
             draggable={isEditMode && isActiveNumbers}
             onDragEnter={onDragEnter ?? null}
             onDragStart={onDragStart}
             onDragOver={onDragOver ?? null}
             onDragEnd={onDragEnd ?? null}
             onDoubleClick={isEditMode ? onDoubleClick : null} onDrop={onDrop} >

            {
                myReverseNumber.map((el) => <button type={"button"} key={`number+${el}`}>{el}</button>)
            }
        </div>
    )
}

export default Numbers;