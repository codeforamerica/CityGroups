var cityGroups = {};
cityGroups.map = {};
cityGroups.geoJSON = {};
cityGroups.map.settings = {};
var map;

$(document).ready(function() {
  cityGroups.loadData();
});


cityGroups.loadData = function() {
  var dataPath = "http://localhost/codeforamerica/citygroups/citygroups_map/data/community-groups-data.json";
  
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
  cityGroups.map.loadMap();  
  var mapObject = cityGroups.geoJSON(cityGroups.data.nodes);
console.log(mapObject);

	       var polygon = new L.Polygon(polygonPoints);
	polygon.bindPopup("I am a polygon.");
	map.addLayer(polygon);
	
  return false;
};

cityGroups.geoJSON = function(nodes) {
  var features = {};
  for (i in nodes) {
  console.log($.parseJSON(nodes[i]["node"]["location_geo"]));
  var locationGeoObj = $.parseJSON(nodes[i]["node"]["location_geo"]);
    switch(locationGeoObj.type) {
      case "Point":
/*
        cityGroups.map.settings.latitude = parseFloat(features[i]["geometry"]["coordinates"][0]);
        cityGroups.map.settings.longitude = parseFloat(features[i]["geometry"]["coordinates"][1]);
*/
      break;
      case "Polygon":
        var polygonPoints = Array();
        for (p in locationGeoObj.coordinates) {
          var polygonPoint = new L.LatLng(locationGeoObj.coordinates[0][p][0], locationGeoObj.coordinates[0][p][1]);
          polygonPoints.push(polygonPoint);
        }

      break;
    }
  }
  var mapObject = Array();
  mapObject = polygonPoints;
  return mapObject;
};

cityGroups.map.loadMap = function() {
  // initialize the map on the "map" div with a given center and zoom 
  cityGroups.map.settings.zoom = 13;  
  cityGroups.map.settings.center = new L.LatLng(47.6061889, -122.3308133);
  // cityGroups.map.settings.center = new L.LatLng(cityGroups.map.settings.latitude, cityGroups.map.settings.longitude);
      
  var map = new L.Map('map', cityGroups.map.settings.center);
  
  // create a CloudMade tile layer
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b59bc8b09cd84af58fcef3019d84e662/997/256/{z}/{x}/{y}.png',
      cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
  
  map.setView(cityGroups.map.settings.center, cityGroups.map.settings.zoom).addLayer(cloudmade);
};
