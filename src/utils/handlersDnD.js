const handlersDnD = {
    handleDragStartSidebarComponents: (isDragStartSideBarComponents) => (e) => {
        e.dataTransfer.setData("text", `${e.currentTarget.id}`)
        e.currentTarget.id === "display"
            ? isDragStartSideBarComponents(true, true)
            : isDragStartSideBarComponents(true, false)
    },
    handleDragEndSidebarComponents: (isDragStartSideBarComponents) => () => {
        isDragStartSideBarComponents(false)
    },
    handleDragOver: (setDragover = {}) => e => {
        e.preventDefault();
        e.stopPropagation();
        if (Array.from(setDragover).length) {
            setDragover(true)
        }
    },
    handleDrop: (addCanvasComponents, setDragover) => e => {
        e.preventDefault();
        e.stopPropagation();
        const component = e.dataTransfer.getData("text")
        if (component) addCanvasComponents(component)
        setDragover(false)
    },
    handleDropCanvasComponents: (setWhereAddDnD) => () => {
        setWhereAddDnD("")
    },
    handleDragStartCanvasComponents: (i, dragItem) => (e) => {
        dragItem.current = i;
    },
    handleDragEnterCanvasComponents: (i, dragOverItem, dragItem, setWhereAddDnD, setIndexDragOver) => (e) => {
        dragOverItem.current = i;
        setIndexDragOver(dragOverItem.current);
        e.preventDefault();
        e.stopPropagation();
        if (dragItem.current !== dragOverItem.current) {
            if (dragItem.current > dragOverItem.current) {
                setWhereAddDnD("above")
            }

            if (dragItem.current < dragOverItem.current) {
                setWhereAddDnD("under")

            }
        }
    },
    handleDragEndCanvasComponents: (componentsList, dragItem, dragOverItem, setList, setWhereAddDnD) => (e) => {
        setWhereAddDnD("")
        const copyListItems = [...componentsList]
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        setList(copyListItems);
    },

}


export default handlersDnD;