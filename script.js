let myMap = null;
let earthquakeMarkers = L.layerGroup();

let earthquakeData = [];
const earthquakeUrl ="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-04-01&endtime=2023-04-04";
function initializeMap() {

  if (typeof L === "undefined") {
    return;
  }
  if (myMap) {
    return myMap;
  }

  let mapElement = document.getElementById("map");


  if (!mapElement) {
    mapElement = document.createElement("div");
    mapElement.id = "map";
    document.body.appendChild(mapElement);
  }

  myMap = L.map(mapElement, {
    attributionControl: false,
    preferCanvas:true,
  });
  const tectonicPlatesLayerGroup = L.layerGroup();
  const tectonicPlatesUrl =
    "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

  fetch(tectonicPlatesUrl)
    .then((response) => response.json())
    .then((data) => {
      const tectonicPlatesLayer = L.geoJSON(data, {
        style: function (feature) {
          return {
            color: "#ff0000",
            weight: 3,
          };
        },
      });
      const bounds = tectonicPlatesLayer.getBounds();
      const maxBounds = bounds.pad(0);
      myMap.setMaxBounds(maxBounds);
      myMap.fitBounds(bounds).setZoom(1.45);
      tectonicPlatesLayerGroup.addLayer(tectonicPlatesLayer);
      tectonicPlatesLayerGroup.addTo(myMap);

      const tectonicPlatesAttribution =
        'Tectonic Plate Boundaries &copy; <a href="https://github.com/fraxen/tectonicplates">Fraxen</a>';
      if (myMap.attributionControl) {
        myMap.attributionControl.addAttribution(tectonicPlatesAttribution);
      }
    })
  const baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  });
  baseLayer.addTo(myMap);
  const initialMarkers = L.layerGroup();
  initialMarkers.addTo(myMap);
  const magnitudeFilter = document.getElementById("magnitude-filter");
  magnitudeFilter.addEventListener("change", function () {
    filterMarkers(magnitudeFilter.value, earthquakeMarkers);
  });
  if (localStorage.getItem('earthquakeData')) {
    console.log('Stored Data:',localStorage)
    const storedEarthquakeData = JSON.parse(localStorage.getItem('earthquakeData'));
    storedEarthquakeData.forEach((earthquake) => {
      const coords = earthquake.coordinates;
      const magnitude = earthquake.mag;
      const popupText = `<strong>Magnitude:</strong> ${magnitude} &nbsp; `;
      const marker = L.marker(coords).bindPopup(popupText);
      marker.magnitude = magnitude;
      earthquakeMarkers.addLayer(marker);
    });
    earthquakeMarkers.addTo(myMap);
  } else {
    fetch(earthquakeUrl)
      .then((response) => response.json())
      .then((data) => {
        data.features.forEach((feature) => {
          const coords = feature.geometry.coordinates.slice(0, 2).reverse();
          const magnitude = feature.properties.mag;
          const popupText = `<strong>Magnitude:</strong> ${magnitude} &nbsp; `;
          const marker = L.marker(coords).bindPopup(popupText);
          marker.magnitude = magnitude;
          earthquakeMarkers.addLayer(marker);
  
          earthquakeData.push({
            coordinates: coords,
            mag: magnitude,
          });
        });
        saveEarthquakeData(earthquakeData);
        earthquakeMarkers.addTo(myMap);
      });
  }
  if (typeof L.grid === 'function') {
    L.grid();
  }

  return myMap;
}

function filterMarkers(range) {
  clearMarkers(earthquakeMarkers);

  const storedEarthquakeData = JSON.parse(localStorage.getItem('earthquakeData')) || [];
  const filteredData = storedEarthquakeData.filter(function (earthquake) {
    const magnitude = earthquake.mag;
    const coords = earthquake.coordinates;
    return range === "" ||
      (magnitude >= parseFloat(range) && magnitude < parseFloat(range) + 1);
  });
  filteredData.forEach(function (earthquake) {
    const magnitude = earthquake.mag;
    const coords = earthquake.coordinates;
    const marker = L.marker(coords).addTo(earthquakeMarkers);
    const popupText = `<strong>Magnitude:</strong> ${magnitude} &nbsp; `;
    marker.bindPopup(popupText);
    marker.magnitude = magnitude;
  });
  return filteredData;
}
const magnitudeFilter = document.getElementById("magnitude-filter");
magnitudeFilter.addEventListener("change", function () {
  const filteredData = filterMarkers(magnitudeFilter.value, earthquakeMarkers);
  console.log('Filtered data:',filteredData);
});

function saveEarthquakeData(data) {
  localStorage.removeItem('earthquakeData')
  localStorage.setItem('earthquakeData', JSON.stringify(data));
  console.log('New Data:', JSON.parse(localStorage.getItem('earthquakeData')));
}
function clearMarkers(earthquakeMarkers) {
  earthquakeMarkers.eachLayer(function (marker) {
    marker.removeFrom(myMap);
  });
}
function refreshData() {
  localStorage.clear();
  clearMarkers(earthquakeMarkers);
  earthquakeData = [];
  fetch(earthquakeUrl)
    .then((response) => response.json())
    .then((data) => {
      data.features.forEach((feature) => {
        const coords = feature.geometry.coordinates.slice(0, 2).reverse();
        const magnitude = feature.properties.mag;
        const popupText = `<strong>Magnitude:</strong> ${magnitude} &nbsp; `;
        const marker = L.marker(coords).bindPopup(popupText);
        marker.magnitude = magnitude;
        earthquakeMarkers.addLayer(marker);
  
        earthquakeData.push({
          coordinates: coords,
          mag: magnitude,
        });
      });
      saveEarthquakeData(earthquakeData);
      earthquakeMarkers.addTo(myMap);
    });
}

const refresh = document.getElementById("refresh");
refresh.addEventListener("click", refreshData);
initializeMap();