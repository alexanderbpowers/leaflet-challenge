var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

// const API_KEY = "pk.eyJ1Ijoic2JvdGVqdSIsImEiOiJjazQ0dGM0bWcwMWsxM2xwNWJvOWlsb3N6In0.GFCTXXxi1bSRo66Rwcjf0Q"


d3.json(url, function (response) {

    console.log(response)
    console.log(response.bbox[0])

    // var lat = 
    // var lon = 

    var myMap = L.map("map", {
        center: [41.184339, -123.279893],
        zoom: 5
      });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      }).addTo(myMap);


    // Grab values to evenly splits up magnitude 
    var magnitude = []
    for (var x = 0; x < response.features.length; x++) {
        magnitude.push(response.features[x].properties.mag)
        }
        magnitude = magnitude.sort((a,b) => a -b)

        var magMin = d3.min(magnitude)
        var magFirstQ = d3.quantile(magnitude, 0.25)
        var magMedian = d3.median(magnitude)
        var magThirdQ = d3.quantile(magnitude, 0.75)
        var magMax = d3.max(magnitude)

    function getColour(d) {
        return d >= magThirdQ ? 'rgb(173, 1, 7)' :
          d >= magMedian ? 'rgb(255, 114, 2)' : 
          d >= magFirstQ ? 'rgb(255, 227, 0)' :
          d >= magMin ? 'rgb(255, 225, 248)' : 
          'blue';
      }

      function getRadius(d) {
        return d >= magThirdQ ? (d * 5000) :
          d >= magMedian ? (d * 3500) : 
          d >= magFirstQ ? (d * 2000) :
          d >= magMin ? (d * 1500):
          'NULL';
      }

    for (var x = 0; x < response.features.length; x++) {
        var lon = response.features[x].geometry.coordinates[0];
        var lat = response.features[x].geometry.coordinates[1];
        var magnitude = response.features[x].properties.mag
        var title = response.features[x].properties.title

    L.circle([lat,lon], {
            color: getColour(magnitude),
            fillColor: getColour(magnitude),
            fillOpacity: 0.5,
            radius: getRadius(magnitude)
        }).bindPopup("<h1>" + title + "</h1> <hr> <h3>Magnitude: " + magnitude + "</h3>")
            .addTo(myMap);
          }
          console.log(response.features[1].properties.title)
        
    var legend = L.control({ position: "bottomright"});

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend info");

        var grades = [magMin, magFirstQ, magMedian, magThirdQ]
        var colours = ['#ffe1f8','#ffe300','#ff7202','#ad0107']

        div.innerHTML += '<strong>Magnitude</strong></br>';

        for(var x =0; x < grades.length; x++) {
            div.innerHTML += "<i style='background: " + colours[x] + "'></i> " + grades[x] + '</br>';
        }
        return div;
    };

    legend.addTo(myMap)

})
