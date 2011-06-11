var cityGroups = {};
cityGroups.map = {};
cityGroups.geoJSON = {};
cityGroups.map.settings = {};
  
$(document).ready(function() {
  cityGroups.loadData();
});


cityGroups.loadData = function() {
  var dataPath = "http://localhost/codeforamerica/citygroups/citygroups_map/data/citygroups_sample_data.json";
  
  var data = "";
        
  $.ajax({
    url: dataPath,
    dataType: 'json',
    data: data,
    success: cityGroups.loadDataSuccess,
    error: cityGroups.loadDataError
  });
  
  return false;
};

cityGroups.loadDataError = function(data) {
  console.log("error");
  return false;
};

cityGroups.loadDataSuccess = function(data) {
  console.log("success!");
  cityGroups.data = data;
  // console.log(cityGroups.data.nodes[0]['node']['location_geo']);
  cityGroups.geoJSON(cityGroups.data.nodes[0]['node']['location_geo']['features']);
  cityGroups.map.loadMap();
  return false;
};

cityGroups.geoJSON = function(features) {
  for (i in features) {
//  console.log(features[i]["geometry"]["type"]);

    switch(features[i]["geometry"]["type"]) {
      case "Point":
        cityGroups.map.settings.latitude = parseFloat(features[i]["geometry"]["coordinates"][0]);
        cityGroups.map.settings.longitude = parseFloat(features[i]["geometry"]["coordinates"][1]);
      break;
    }
  }
};

cityGroups.map.loadMap = function() {
  // initialize the map on the "map" div with a given center and zoom 
  cityGroups.map.settings.zoom = 13;  
  cityGroups.map.settings.center = L.LatLng(47.6061889, -122.3308133);
  cityGroups.map.settings.center = new L.LatLng(cityGroups.map.settings.latitude, cityGroups.map.settings.longitude);
  console.log(cityGroups.map.settings.center);
      
      
  var map = new L.Map('map', cityGroups.map.settings.center);
  
  // create a CloudMade tile layer
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b59bc8b09cd84af58fcef3019d84e662/997/256/{z}/{x}/{y}.png',
      cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
  

  map.setView(cityGroups.map.settings.center, cityGroups.map.settings.zoom).addLayer(cloudmade);
  
		
/*
  var markerLocation = new L.LatLng(cityGroups.map.settings.center);
  
  marker = new L.Marker(markerLocation);
		
	map.addLayer(marker);
	marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
	
*/
/*

	var circleLocation = cityGroups.map.settings.center,
		circleOptions = {color: '#f03', opacity: 0.7},
		circle = new L.Circle(circleLocation, 500, circleOptions);
	
	circle.bindPopup("I am a circle.");
	map.addLayer(circle);
*/
	
/*

	var p1 = new L.LatLng(47.6061889, -122.3308133),
	p2 = new L.LatLng(47.6064889, -123.3308233),
	p3 = new L.LatLng(47.606289, -122.33083537),
	polygonPoints = [p1, p2, p3],
	polygon = new L.Polygon(polygonPoints);
	
	polygon.bindPopup("I am a polygon.");
	map.addLayer(polygon);
	
	map.on('click', onMapClick);
	
	var popup = new L.Popup();
		
	function onMapClick(e) {
		var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
		
		popup.setLatLng(e.latlng);
		popup.setContent("You clicked the map at " + latlngStr);
		map.openPopup(popup);
	}
*/


};
