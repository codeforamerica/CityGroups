$(document).ready(function() {
  var mapData = {};
  mapData.center = new L.LatLng(47.6063889, -122.3308333); // Seattle
  mapData.zoom = 13;


  

  var mapSettings = {
    center: mapData.center, 
    zoom: mapData.zoom
  };
  
  // initialize the map on the "map" div with a given center and zoom 
  var map = new L.Map('map', mapSettings);
  
  // create a CloudMade tile layer
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b59bc8b09cd84af58fcef3019d84e662/997/256/{z}/{x}/{y}.png',
      cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
  

  map.setView(mapData.center, mapData.zoom).addLayer(cloudmade);
  
		
		var markerLocation = new L.LatLng(51.5, -0.09),
			marker = new L.Marker(markerLocation);
		
		map.addLayer(marker);
		marker.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
		
	
		var circleLocation = new L.LatLng(51.508, -0.11),
			circleOptions = {color: '#f03', opacity: 0.7},
			circle = new L.Circle(circleLocation, 500, circleOptions);
		
		circle.bindPopup("I am a circle.");
		map.addLayer(circle);
		
	
		var p1 = new L.LatLng(51.509, -0.08),
			p2 = new L.LatLng(51.503, -0.06),
			p3 = new L.LatLng(51.51, -0.047),
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

});