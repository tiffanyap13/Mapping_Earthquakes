
  // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Accessing the Toronto airline routes GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/tiffanyap13/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/tiffanyap13/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";
// Create a style for the lines.
let styleInfo = {
  color: "#6754D8",
  weight: 1,
  fillColor: "yellow",
  fillOpacity: 0.2,

}
// Grabbing our GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: "#ffae42",
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
      // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
            // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo
        }).addTo(map);
    });
// // // Creating a GeoJSON layer with the retrieved data.
// createAirport(data.features);

// function createAirport(airportData) {
// L.geoJson(airportData, {
//   onEachFeature: function(feature, layer) {
//           console.log(layer);
//           layer.bindPopup("<h2>" + "Airport Code:" + feature.properties.faa + "<div>" + "Airport name:" + feature.properties.name + "</div>" + "</h2>")
//           .addTo(map);
// }});
// // // Grabbing our GeoJSON data.
// // L.geoJSON(sanFranAirport, {
// //     onEachFeature: function(feature, layer) {
// //       console.log(layer);
// //       layer.bindPopup(("<h2>" + "Airport Code:" + feature.properties.faa + "<div>" + "Airport name:" + feature.properties.name + "</div>" + "</h2>"),
// //       "<h3> + feature.properties.city + </h3>");
// //       // .bindPopup("<h2>" + feature.properties.city + "</h2>");
// //      }
// // Then we add our 'graymap' tile layer to the map.
// // streets.addTo(map);
// }});