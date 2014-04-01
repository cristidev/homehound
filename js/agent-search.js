 $(document).ready( function() {
    // Start maps
    initialiseMaps();
    eqColumns();
    doSelect();
});

 function initialiseMaps() {
    var myLatLng = new google.maps.LatLng(-33.872255, 151.228405);
    var mapOptions = {
      zoom:  18,
      center: myLatLng
    };

    var map = new google.maps.Map(document.getElementById('as-map'),
        mapOptions);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title:"123 First Ave, Potts Point"
    });

    marker.setMap(map);
  }
  
  function eqColumns(){
  	if($('.left-map').height()>$('.right-agents').height()){
  		$('.right-agents').height($('.left-map').height());
  	} else {
  		$('.left-map').height($('.right-agents').height());
  	}
  }
  
function doSelect(){
 $(".dropdown img.flag").addClass("flagvisibility");

        $(".dropdown dt a").click(function() {
            $("dd ul",$(this).parent().parent()).toggle();
        });
                    
        $(".dropdown dd ul li a").click(function() {
            var text = $(this).html();
            $("dt a span",$(this).parent().parent().parent().parent()).html(text);
            $(".dropdown dd ul").hide();
            $("#result").html("Selected value is: " + getSelectedValue("sample"));
        });
                    
}

function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
}

$(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (! $clicked.parents().hasClass("dropdown"))
        $(".dropdown dd ul").hide();
});
