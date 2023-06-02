// function allowDrop(ev) {
//     ev.preventDefault();
//   }
  
//   function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
//   }
  
//   function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
//   }



// const previewMap = document.getElementById("previewMap")
// const locationInput=document.getElementById("locationInput")
// const startFromInput = document.getElementById("startFromInput");
// const destinationInput = document.getElementById("destinationInput");
// const timeOfDay = document.getElementById("timeOfDay");
// const fastestSwitch = document.getElementById("fastestSwitch");
// const safestSwitch = document.getElementById("safestSwitch");

// const DirectionsService = new DirectionsService();
let  map;
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();

let directionsRenderer;
let directionsService;
let stepDisplay;
let markerArray = [];

let request = {
  origin: LatLng | String | google.maps.Place, // or 'Starting address or LatLng',
  destination: LatLng | String | google.maps.Place, // or 'Destination address or LatLng'
  travelMode: 'DRIVING', // or other travel modes like 'WALKING', 'TRANSIT', 'BICYCLING'
  transitOptions: TransitOptions,
  drivingOptions: DrivingOptions,
  unitSystem: UnitSystem,
  waypoints: DirectionsWaypoint,
  optimizeWaypoints: Boolean,
  provideRouteAlternatives: Boolean,
  avoidFerries: Boolean,
  avoidHighways: Boolean,
  avoidTolls: Boolean,
  region: String
};

function initMap() {
  // Instantiate a directions service.
  
  // Create a map and center it on Manhattan.
  let atlanta = new google.maps.LatLng(33.753746, -84.386330);
  let mapOptions = {
    zoom: 9,
    mapTypeid: "satellite",
    mapTypeid: "terrain", // https://www.youtube.com/watch?v=2LvwNMgW4vw
    center: atlanta
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  // Create a renderer for directions and bind it to the map.
  let rendererOptions = {
    map: map
  }
  let directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions)

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();
}

function initMap() {
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  let chicago = new google.maps.LatLng(41.850033, -87.6500523);
  let mapOptions = {
    zoom:7,
    center: chicago
  }
  let map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('directionsPanel'));
}

function calcRoute() {

  // First, clear out any existing markerArray
  // from previous calculations.
  for (i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }
  // Retrieve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  let start = document.getElementById('start').value;
  let end = document.getElementById('end').value;
  let request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING'
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    if (status == "OK") {
    let warnings = document.getElementById("warnings_panel");
      warnings.innerHTML = "" + response.routes[0].warnings + "";
      directionsRenderer.setDirections(response);
      showSteps(response);
    } else {
        // Handle any errors that occurred during the request
    }
  });
}

function showSteps(directionResult) {
  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  let myRoute = directionResult.routes[0].legs[0];

  for (let i = 0; i < myRoute.steps.length; i++) {
      let marker = new google.maps.Marker({
        position: myRoute.steps[i].start_point,
        map: map
      });
      attachInstructionText(marker, myRoute.steps[i].instructions);
      markerArray[i] = marker;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

// function initMap(): void {
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const map = new google.maps.Map(
//       document.getElementById("map") as HTMLElement,
//       {
//         zoom: 6,
//         center: { lat: 41.85, lng: -87.65 },
//       }
//     );
  
//     directionsRenderer.setMap(map);
  
//     (document.getElementById("submit") as HTMLElement).addEventListener(
//       "click",
//       () => {
//         calculateAndDisplayRoute(directionsService, directionsRenderer);
//       }
//     );
//   }
  
//   function calculateAndDisplayRoute(
//     directionsService: google.maps.DirectionsService,
//     directionsRenderer: google.maps.DirectionsRenderer
//   ) {
//     const waypts: google.maps.DirectionsWaypoint[] = [];
//     const checkboxArray = document.getElementById(
//       "waypoints"
//     ) as HTMLSelectElement;
  
//     for (let i = 0; i < checkboxArray.length; i++) {
//       if (checkboxArray.options[i].selected) {
//         waypts.push({
//           location: (checkboxArray[i] as HTMLOptionElement).value,
//           stopover: true,
//         });
//       }
//     }
  
//     directionsService
//       .route({
//         origin: (document.getElementById("start") as HTMLInputElement).value,
//         destination: (document.getElementById("end") as HTMLInputElement).value,
//         waypoints: waypts,
//         optimizeWaypoints: true,
//         travelMode: google.maps.TravelMode.DRIVING,
//       })
//       .then((response) => {
//         directionsRenderer.setDirections(response);
  
//         const route = response.routes[0];
//         const summaryPanel = document.getElementById(
//           "directions-panel"
//         ) as HTMLElement;
  
//         summaryPanel.innerHTML = "";
  
//         // For each route, display summary information.
//         for (let i = 0; i < route.legs.length; i++) {
//           const routeSegment = i + 1;
  
//           summaryPanel.innerHTML +=
//             "<b>Route Segment: " + routeSegment + "</b><br>";
//           summaryPanel.innerHTML += route.legs[i].start_address + " to ";
//           summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
//           summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
//         }
//       })
//       .catch((e) => window.alert("Directions request failed due to " + status));
//   }
  
//   declare global {
//     interface Window {
//       initMap: () => void;
//     }
//   }
//   window.initMap = initMap;

// previewMap.addEventListener("click", (e) => {

//     console.log("Show location Map") //here we will need to write a function that will bring in location data when a user begins entering input
//   })

// startFromInput.addEventListener("keypress", (e) => {
//   console.log("Show location Map") //here we will need to write a function that will bring in location data when a user begins entering input
// })

// locationInput.addEventListener("input", (e) => {
//     // console.log("Tell me Your!")
// })
// destinationInput.addEventListener("keypress", (e) => {
//   console.log("pull directions to map") //this event will pull direction info from API starting from the startFromInput event response
// })

// timeOfDay.addEventListener("input", (e) => {
//   console.log("departure time, time until arrival, arrival time") //This event will determine if a user is departing at current time or a future time. This will pull data based off of input selected. 
// })

// fastestSwitch.addEventListener("click", (e) => {  
//   console.log("Show Shortest Distance, Avoid Construction, Avoid Police, Take Highway")
// })//This event will filter data by shortest distance, construction, police presence, and highway routes


// safestSwitch.addEventListener("click", (e) => {
//   console.log("Avoid Highways, Avoid Construction, Avoid heavy traffic, avoid accidents")
// })
