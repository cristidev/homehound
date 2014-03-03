/*
site: homehound.com.au
file: global.js
version: 0.0.1
*/

/*
 * table of contents
 *
 * 1. Apply Button
 * 2. Initialize Map
 *
 */

(function() {

  /*
  --------
  1. Apply Button
  --------
  */

  var showHideApplyButton = function() {
    var class_to_add  = 'show'
    ,   $el  = $('.apply-button.sticky')
    ,   s_top  = 200;

    $(document).scroll( function() {
      if ($('body, html').scrollTop() > s_top) {
        $el.addClass(class_to_add);
      } else {
        $el.removeClass(class_to_add);
      }
    });

  }

  /*
  ----------
  2. Initialize Map
  ----------
  */

  function initialiseMaps() {
    var myLatLng = new google.maps.LatLng(-33.872255, 151.228405);
    var mapOptions = {
      zoom:  18,
      center: myLatLng
    }

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title:"123 First Ave, Potts Point"
    });

    marker.setMap(map);
  }


  showHideApplyButton;
  initialiseMaps();

})(jQuery);



