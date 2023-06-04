//https://codepen.io/Amr_Saker/pen/NWKgxLv

// let helmet;
// let image = document.getElementsByClassName(".helmet");

// function allowDrop(eve) {
//     eve.preventDefault() ;
// }
// function DragStart(eve) {
//   image = eve.target.class ;
// }

// function drop(eve){
//     eve.target.append(document.querySelector(".dropzone"))
// }

let myId;
let x = document.getElementById(myId);

function allowDrop(eve) {
  eve.preventDefault();
}
function DragStart(eve) {
  myId = eve.target.id;
}

function drop(eve) {
  eve.target.append(document.getElementById(myId));
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 37.0902, lng: -95.7129 }, // Centered on the USA.
  });
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById("panel"),
  });

  directionsRenderer.addListener("directions_changed", () => {
    const directions = directionsRenderer.getDirections();

    if (directions) {
      computeTotalDistance(directions);
    }
  });

  // const startFromInput = document.getElementById("startFromInput");
  // const destinationInput = document.getElementById("destinationInput");

  let startHere = document.querySelector("#startFromInput"); //Event Listener
  let endHere = document.querySelector("#destinationInput"); //Event Listener
  let startLoc = "";
  let endLoc = "";

  startHere.addEventListener("input", (e) => {
    startLoc = startHere.value;
    console.log(startLoc);
  });

  endHere.addEventListener("input", (e) => {
    endLoc = endHere.value;
    console.log(endLoc);
  });

  const previewMap = document.getElementById("previewMap");

  previewMap.addEventListener("click", (e) => {
    displayRoute(startLoc, endLoc, directionsService, directionsRenderer);
  });
}

let avoidHighways;
let avoidTolls;
let provideRouteAlternatives;
let travelMode;

function displayRoute(origin, destination, service, display) {
  service
    .route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways,
      avoidTolls,
      provideRouteAlternatives,
    })
    .then((result) => {
      display.setDirections(result);
    })
    .catch((e) => {
      console.log("Could not display directions due to: " + e);
    });
}

const fastestSwitch = document.getElementById("fastestSwitch");

fastestSwitch.addEventListener("change", function () {
  if (fastestSwitch.checked) {
    provideRouteAlternatives = true;
  } else {
    provideRouteAlternatives = false;
  }
  console.log(provideRouteAlternatives);
});

const safestSwitch = document.getElementById("safestSwitch");

safestSwitch.addEventListener("change", function () {
  if (safestSwitch.checked) {
    avoidHighways = true;
    avoidTolls = true;
  } else {
    avoidHighways = false;
    avoidTolls = false;
  }
  console.log(avoidHighways);
});

function computeTotalDistance(result) {
  let total = 0;
  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }

  total = total / 1000;
  document.getElementById("total").innerHTML = total + " km";
}

window.initMap = initMap;
