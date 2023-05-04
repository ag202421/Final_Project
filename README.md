# Final_Project
### Project Information
My project can be found at the following link: https://alexisgoldberg.github.io/Final_Project/
The name of my project is Earthquakes: An Exploration into the Regions that are Impacted
The target browser for my project is Google Chrome Version 113.0.5672.63+

### What the Code Does
My code takes tectonic plate boundaries (from geoJSON files) and puts it over a leaflet map. I also populate markers from my API. Additionally, I added a drop down menu and a refresh button. On the back end, I initially load data from the API and store it locally. Then, I filter the list from localStorage and output the filtered list. For the refresh button, I fetch directly from the API, which resets the filter and stores the new fetch locally.

### Project Description
I used this API: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-04-01&endtime=2023-04-04
I used an image and a leaflet.js map to visualize the data.
The tectonic boundary plates are found at: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json
I also used this library for the markers: https://leaflet.github.io/Leaflet.markercluster/dist/leaflet.markercluster.js
You can find the JS leaflet library here: https://unpkg.com/leaflet@1.9.3/dist/leaflet.js
In addition, I used the css frameworks fontawesome and leaflet.js to make my design more professional.
The fontawesome version is 6.4.0, you can find it here: https://use.fontawesome.com/releases/v6.4.0/css/all.css
The leaflet.js version is 1.9.3, you can find it here: https://unpkg.com/leaflet@1.9.3/dist/leaflet.css
Thank you to all the programmers who worked on these frameworks and libraries, this would not be possible without your effort.
This project is meant to explore the relationship between plate tectonics and earthquakes. I am attempting to figure out what regions are more prone to earthquakes. By knowing this, leaders can invest in better infrastructure for their countries. Sometimes, to get funding you need proof of risk. This visualization shows that certain regions near tectonic plates are at significant risk. The goal is to use this for advocacy and policymaking. 
