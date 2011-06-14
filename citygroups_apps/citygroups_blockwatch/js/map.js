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


/*
  var polygon = new L.Polygon(mapObject, polygonOptions);
	polygon.bindPopup("I am a polygon.");
	map.addLayer(polygon);
*/




  return false;
};

cityGroups.geoJSON = function(nodes) {
  var mapObject = [];
  var polygonPoints = [];
  var polygonPoint;
  var features = {};
  for (i in nodes) {
    var locationGeoObj = $.parseJSON(nodes[i]["node"]["location_geo"]);
    switch(locationGeoObj.type) {
      case "Point":
      break;
      case "Polygon":
        var polygonPoints = Array();

        for (p in locationGeoObj.coordinates[0]) {
            polygonPoint = p;
            polygonPoint = new L.LatLng(locationGeoObj.coordinates[0][p][1], locationGeoObj.coordinates[0][p][0]);
            polygonPoints.push(polygonPoint);
        }

        polygonOptions = {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        };
        // @TODO get center of polygon.
        
        var polygon2 = new L.Polygon(polygonPoints,polygonOptions);
        var node = nodes[i]["node"];
    		
    		var markerLocation = polygonPoints[0];


        var marker = new L.Marker(markerLocation);
        map.addLayer(marker);
        marker.on('click', onMapClick);
	
    		function onMapClick(e) {
    		  $('div#popup-content').html(node.title);
    		  console.log(node.title);
          map.addLayer(polygon2);
    		}
      break;
    }
  }

  mapObject = polygonPoints;
  return mapObject;
};

cityGroups.map.loadMap = function() {
  // initialize the map on the "map" div with a given center and zoom
  cityGroups.map.settings.zoom = 11;
  cityGroups.map.settings.center = new L.LatLng(47.6061889, -122.3308133);
  // cityGroups.map.settings.center = new L.LatLng(cityGroups.map.settings.latitude, cityGroups.map.settings.longitude);

  map = new L.Map('map', cityGroups.map.settings.center);

  // create a CloudMade tile layer
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b59bc8b09cd84af58fcef3019d84e662/997/256/{z}/{x}/{y}.png',
  cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
  map.setView(cityGroups.map.settings.center, cityGroups.map.settings.zoom);
/*   map.setView(cityGroups.map.settings.center, cityGroups.map.settings.zoom).addLayer(cloudmade); */
};

/*
cityGroups.map.clickMap = function(node) {
		map.on('click', onMapClick);
		
		var popup = new L.Popup();
				
		function onMapClick(e) {
			var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
			
			popup.setLatLng(e.latlng);
			popup.setContent("You clicked the map at " + latlngStr);
			map.openPopup(popup);
		}


};
*/
