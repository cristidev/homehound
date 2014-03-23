 $(document).ready( function() {
    // Start maps
    initialiseMaps();
    
});

 function initialiseMaps() {
    var myLatLng = new google.maps.LatLng(-33.872255, 151.228405);
    var mapOptions = {
      zoom:  18,
      center: myLatLng
    };

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title:"123 First Ave, Potts Point"
    });

    marker.setMap(map);
  }