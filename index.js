const startFromInput = document.getElementById("startFromInput");
const destinationInput = document.getElementById("destinationInput");
const timeOfDay = document.getElementById("timeOfDay");
const fastestSwitch = document.getElementById("fastestSwitch");
const safestSwitch = document.getElementById("safestSwitch");
const previewMap = document.getElementById("previewMap");




startFromInput.addEventListener("keypress", (e) => {
  console.log("Show location Map") //here we will need to write a function that will bring in location data when a user begins entering input
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
  console.log("Avoid Highways, Avoid Construction, Avoid heavy traffic, avoid accidents")
})
