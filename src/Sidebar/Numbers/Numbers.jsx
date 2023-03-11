import styles from "./Numbers.module.scss"

const Numbers = ({numbers, isEditMode, handleDragStart, ...props}) => {
    const myReverseNumber = numbers.slice().reverse().reduce((acc, el, i) => {
        if ((i + 1) % 3 === 0) {
            const x = el
            acc[i] = acc[i - 2]
            acc[i - 2] = x
            return acc
        }
        return [...acc, el]
    }, [])

    return (
        <div className={styles.numbers} id={"numbers"}
             draggable={isEditMode && props.sidebarComponents.includes("numbers")}
             onDragEnter={props.handleDragEnter ?? null} onDragStart={handleDragStart}
             onDragOver={(e) => e.preventDefault()}
             onDragEnd={props.onDragEnd ?? null}>
            {
                myReverseNumber.map((el) => <button type={"button"} key={`number+${el}`}>{el}</button>)
            }
        </div>
    )
}

export default Numbers;