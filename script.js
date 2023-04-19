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
    zoom:19
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

      const baseLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: 'Base Map &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a>',
      });

      const bounds = tectonicPlatesLayer.getBounds();
      myMap.fitBounds(bounds);

      tectonicPlatesLayer.addTo(myMap);
      baseLayer.addTo(myMap);
      const tectonicPlatesAttribution = 'Tectonic Plate Boundaries &copy; <a href="https://github.com/fraxen/tectonicplates">Fraxen</a>';
      tectonicPlatesLayer.setAttribution(tectonicPlatesAttribution);
    });

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
