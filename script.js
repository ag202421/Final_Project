
let myMap = null;

function initializeMap() {
  if (myMap) {
    return myMap;
  }

  let mapElement = document.getElementById("map");

  if (!mapElement) {
    mapElement = document.createElement("div");
    mapElement.id = "map";
    document.body.appendChild(mapElement);
  }

  myMap = L.map(mapElement,{
    attributionControl:false,
  });


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
      tectonicPlatesLayer.addTo(myMap);

      const tectonicPlatesAttribution =
        'Tectonic Plate Boundaries &copy; <a href="https://github.com/fraxen/tectonicplates">Fraxen</a>';
      if (myMap.attributionControl) {
        myMap.attributionControl.addAttribution(tectonicPlatesAttribution);
      }
    })
    .catch((error) => {});

  const baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  });
  baseLayer.addTo(myMap);
  const earthquakeUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02";
  fetch(earthquakeUrl)
    .then((response) => response.json())
    .then((data) => {
      const markers = L.markerClusterGroup();
      data.features.forEach((feature) => {
        const coords = feature.geometry.coordinates.slice(0, 2).reverse(); 
        const magnitude = feature.properties.mag;
        const popupText = `<strong>Magnitude:</strong> ${magnitude}`;
        const marker = L.marker(coords).bindPopup(popupText);
        markers.addLayer(marker);
      });
      markers.addTo(myMap);
    })
    .catch((error) => {});
    
  if (typeof L.grid === 'function') {
    L.grid().remove();
  }
  
  return myMap;
}
if (document.getElementsByClassName("map-container").length > 0) {
  initializeMap();
}
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
