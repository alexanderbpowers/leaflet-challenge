var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

console.log(API_KEY)


d3.json(url, function (response) {

    console.log(response)
    console.log(response.bbox[0])
    // var lat = 
    // var lon = 

    var myMap = L.map('map', {
        centre: [0.000000, 0.000000],
        zoom: 1
    })

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      }).addTo(myMap);

})



