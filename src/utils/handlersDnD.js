const handlersDnD = {
    handleDragStartSidebarComponents: e => e.dataTransfer.setData("text", `${e.target.id}`),
    handleDragOver: (setDragover = {}) => e => {
        e.preventDefault();
        e.stopPropagation();
        if (Array.from(setDragover).length) setDragover(true)
    },
    handleDrop: (addCanvasComponents, setDragover) => e => {
        e.preventDefault();
        e.stopPropagation();
        addCanvasComponents(e.dataTransfer.getData("text"))
        setDragover(false)
    },
    handleDragStartCanvasComponents: (i, dragItem) => (e) => {
        dragItem.current = i;
    },
    handleDragEnterCanvasComponents: (i, dragOverItem) => () => {
        dragOverItem.current = i;
    },
    handleDragEndCanvasComponents: (componentsList, dragItem, dragOverItem, setList) => (e) => {
        const copyListItems = [...componentsList];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        setList(copyListItems);
    },

}

export default handlersDnD;