$(document).ready(function() {
  // initialize the map on the "map" div with a given center and zoom 
  var map = new L.Map('map', {
      center: new L.LatLng(51.505, -0.09), 
      zoom: 13
  });
  
  // create a CloudMade tile layer
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b59bc8b09cd84af58fcef3019d84e662/997/256/{z}/{x}/{y}.png',
      cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
  
  var london = new L.LatLng(51.505, -0.09); // geographical point (longitude and latitude)
  map.setView(london, 13).addLayer(cloudmade);
  
  // add the CloudMade layer to the map
  map.addLayer(cloudmade);

});