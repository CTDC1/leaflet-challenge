var map = L.map('map').setView([20,-80], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url).then(data => {

  L.geoJSON(data, {
    style: function (feature) {
      let mag = feature.properties.mag;
      
      let depth = feature.geometry.coordinates[2];
      console.log(feature);
      return {
        color: 'black',
        weight: 1,
        radius: mag * 3,
        fillOpacity: 0.8,
        fillColor: 
          depth < 10 ? "green" :
          depth < 30 ? "lime" :
          depth < 50 ? "yellow" :
          depth < 70 ? "orange" :
          depth < 90 ? "darkorange": "red"
      
      };
    },

    pointToLayer: function(geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
  }

  }).bindPopup(function (layer) {
    return layer.feature.properties.description;
  }).addTo(map);
})

let legend = L.control({"position": "bottomright"});

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  
  div.innerHTML = `
  
    <i class ='minusten'> -10-10 </i> <br> 
    <i class ='tentothirty'> 10-30 </i> <br>
    <i class ='thirtytofifth'> 30-50 </i> <br>
    <i class ='fifthtoseventy'> 50-70 </i> <br>
    <i class ='seventytoninety'> 70-90 </i> <br>
    <i class ='ninetyplus'> 90+ </i>
  `; 

  return div
}

legend.addTo(map);



