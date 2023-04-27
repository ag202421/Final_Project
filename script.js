window.addEventListener("scroll", function () {
  const banner = document.getElementById("banner");
  const line = document.getElementById("line");
  const bannerHt = banner.offsetHeight;
  const pageHt = document.body.offsetHeight;
  const scrollPos = window.scrollY;
  const scrollPer = scrollPos / (pageHt - bannerHt);
  const lineW = scrollPer * banner.offsetWidth;
  const maxScroll = pageHt - window.innerHeight;
  line.style.width = lineW + "px";
  if (scrollPos >= maxScroll) {
    line.style.width = banner.offsetWidth + "px";
  } else {
    line.style.width = lineW + "px";
  }
});
let myMap = null;
let earthquakeMarkers = L.layerGroup();
let markers = L.markerClusterGroup();

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
  const earthquakeUrl ="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-04-01&endtime=2023-04-04";
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
      });
      earthquakeMarkers.addTo(myMap);
    });
  const magnitudeFilter = document.getElementById("magnitude-filter");
  magnitudeFilter.addEventListener("change", function () {
    filterMarkers(magnitudeFilter.value, earthquakeMarkers);
  });

  if (typeof L.grid === 'function') {
    L.grid();
  }

  return myMap;
}
function filterMarkers(range, markers) {
  clearMarkers(markers);

  markers.eachLayer(function (marker) {
    const magnitude = marker.magnitude;
    if (
      range === "" ||
      (magnitude >= parseFloat(range) && magnitude < parseFloat(range) + 1)
    ) {
      marker.addTo(myMap);
    }
  });
}



function clearMarkers(markers) {
  markers.eachLayer(function (marker) {
    marker.removeFrom(myMap);
  });
}

const magnitudeFilter = document.getElementById("magnitude-filter");
magnitudeFilter.addEventListener("change", function () {
  clearMarkers(markers);
  filterMarkers(magnitudeFilter.value, markers);
});

initializeMap();

