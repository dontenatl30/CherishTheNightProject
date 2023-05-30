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
const startFromInput = document.getElementById("startFromInput");
const destinationInput = document.getElementById("destinationInput");
const timeOfDay = document.getElementById("timeOfDay");
const fastestSwitch = document.getElementById("fastestSwitch");
const safestSwitch = document.getElementById("safestSwitch");




let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.748, lng: 84.387 },
    zoom: 8,
  });
}



startFromInput.addEventListener("keypress", (e) => {
  console.log("show your location") //here we will need to write a function that will bring in location data when a user begins entering input
})

locationInput.addEventListener("input", (e) => {
    // console.log("Tell me Your!")
})
destinationInput.addEventListener("keypress", (e) => {
  console.log("pull directions to map") //this event will pull direction info from API starting from the startFromInput event response
})

timeOfDay.addEventListener("input", (e) => {
  console.log("departure time, time until arrival, arrival time") //This event will determine if a user is departing at current time or a future time. This will pull data based off of input selected. 
})

fastestSwitch.addEventListener("click", (e) => {  
  console.log("Show Shortest Distance, Avoid Construction, Avoid Police, Take Highway")
})//This event will filter data by shortest distance, construction, police presence, and highway routes


safestSwitch.addEventListener("click", (e) => {
  window.initMap = initMap;("Avoid Highways, Avoid Construction, Avoid heavy traffic, avoid accidents")
})

previewMap.addEventListener("click", (e) => {
  console.log("click for page 3")// This event will take user to page 3 of app
})


