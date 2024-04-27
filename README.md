# Earthquakes: An Exploration into the Regions that are Impacted
### Introduction
Hello, and welcome. This project works with tectonic plate and earthquake data to explore if there is a relationship between the two.
### Project Information
My project can be found at the following link: https://ag202421.github.io/Final_Project/. <br>
The name of my project is Earthquakes: An Exploration into the Regions that are Impacted.
The target browser for my project is Google Chrome Version 113.0.5672.63+ (The newer the version, the better).
### What the Code Does
My code takes tectonic plate boundaries (from geoJSON files) and puts it over a leaflet map. I also populate markers from my API. 
The United States Geological Survey (USGS) provides the API utilized in this project, and gives earthquake data. The API offers real-time access to information on earthquakes that have happened all around the world, including their magnitude, location, and more.
In my project, I am specifically looking for earthquakes that took place between April 1st and April 4th, 2023. I am using the API information to populate the map for my project. Additionally, I added a drop down menu and a refresh button. The code initially loads data from the API and stores it locally. In the event of a page refresh, the page keeps the data from the loaded storage. Also, the page filters the list from localStorage and outputs the filtered list. For the refresh button, the page fetches directly from the API, which resets the filter and stores the new fetch locally.
### Project Description
This project is meant to explore the relationship between plate tectonics and earthquakes. I am attempting to figure out what regions are more prone to earthquakes. The leaflet.js map is a crucial component of the project. The map displays the seismic activity throughout the world. When clicked, the markers provide the magnitude of the earthquake. By knowing this, leaders can invest in better infrastructure for their countries. Sometimes, to get funding you need proof of risk. This visualization shows that certain regions near tectonic plates are at significant risk. The goal is to use this for advocacy, policymaking, and scientific interest. 
### Required Technologies
I used this API: https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-04-01&endtime=2023-04-04. <br>
I used an image and a leaflet.js map to visualize the data. 
The tectonic boundary plates are found at: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json. <br>
You can find the JS leaflet library here: https://unpkg.com/leaflet@1.9.3/dist/leaflet.js. <br>
In addition, I used the css frameworks fontawesome and leaflet.js to make my design more professional.  
The fontawesome version is 6.4.0, you can find it here: https://use.fontawesome.com/releases/v6.4.0/css/all.css. <br>
The leaflet.css version is 1.9.3, you can find it here: https://unpkg.com/leaflet@1.9.3/dist/leaflet.css. <br>
### Running the Project
1. Make sure that you have the latest version of Google Chrome installed on your computer.
2. Go to the following link to access my project: [https://alexisgoldberg.github.io/Final_Project/](https://ag202421.github.io/Final_Project/). 
3. Once the page has loaded, you should be able to see a leaflet map with markers indicating earthquake magnitudes.
4. You can use the dropdown menu to filter the earthquakes based on magnitudes.
5. Clicking the "Refresh" button will fetch the latest earthquake data from the API and reset the filter. <br>
*Note that this project uses an API to fetch earthquake data, so an internet connection is required to run it.*
### Acknowledgements
Thank you to all the programmers who made the frameworks and libraries, this would not be possible without your effort.  

