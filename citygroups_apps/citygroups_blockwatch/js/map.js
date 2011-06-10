$(document).ready(function() {
  // initialize the map on the "map" div with a given center and zoom 
  var map = new L.Map('map', {
      center: new L.LatLng(47.6063889, -122.3308333), 
      zoom: 13
  });
  
  // create a CloudMade tile layer
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b59bc8b09cd84af58fcef3019d84e662/997/256/{z}/{x}/{y}.png',
      cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
  
  var london = new L.LatLng(47.6063889, -122.3308333); // geographical point (longitude and latitude)
  map.setView(london, 11).addLayer(cloudmade);
  
  // add the CloudMade layer to the map
  map.addLayer(cloudmade);
/*
var markerLocation = new L.LatLng(47.37, 122.20);


var marker = new L.Marker(markerLocation);
map.addLayer(marker);

var circleLocation = new L.LatLng(51.508, -0.11),
    circleOptions = {
        color: 'red', 
        fillColor: '#f03', 
        fillOpacity: 0.5
    };
    
var circle = new L.Circle(circleLocation, 500, circleOptions);
map.addLayer(circle);

var p1 = new L.LatLng(51.509, -0.08),
    p2 = new L.LatLng(51.503, -0.06),
    p3 = new L.LatLng(51.51, -0.047),
    polygonPoints = [p1, p2, p3];

var polygon = new L.Polygon(polygonPoints);
map.addLayer(polygon);
*/


/*

marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = new L.Popup();

popup.setLatLng(new L.LatLng(51.5, -0.09));
popup.setContent("I am a standalone popup.");
        
map.openPopup(popup);
*/
});