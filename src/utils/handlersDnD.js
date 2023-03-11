export const handleDragStart = (e) => e.dataTransfer.setData("text", `${e.target.id}`);


// const handleDragEnter = e => {
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log(e)
// };
// const handleDragLeave = e => {
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log(e)
// };
// const handleDragOver = e => {
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log(e)
// };