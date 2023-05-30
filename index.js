function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }



const previewMap = document.getElementById("previewMap")
const locationInput=document.getElementById("locationInput")

previewMap.addEventListener("click", (e) => {
    console.log("PreviewMap!")
})

locationInput.addEventListener("input", (e) => {
    // console.log("Tell me Your!")
})

