/*
site: homehound.com.au
file: global.js
version: 0.0.1
*/

/*
 * table of contents
 *
 * 1. Set map height
 *
 *
 */

(function() {
  $.fn.extend({

    setMapHeight : function() {
      var doc_height    = $(window).height()
      ,   header_height = $('.top-bar').height() + $('.breadcrumbs').height() + $('.inside-search').height() + $('.map-footer').height()
      ,   map_height    = doc_height - header_height - 50;

      $(this).height(map_height);

     return this.each(function(){});

    },

    initialiseMaps : function(marker_sel) {
      // init map
      var map = new google.maps.Map(document.getElementById('map'));

      // add bounds
      var bounds = new google.maps.LatLngBounds();

      // add array to collect positions
      var coords = [], count = 0;

      // prepare markers
      var size    = new google.maps.Size(35, 52)
      ,   origin  = new google.maps.Point(122, 398)
      ,   icon    = new google.maps.MarkerImage("../img/s.png", size, origin, null, null);

      // selected marker
      var size    = new google.maps.Size(35, 52)
      ,   origin  = new google.maps.Point(43, 383)
      ,   selected    = new google.maps.MarkerImage("../img/s.png", size, origin, null, null);

      // Shadows depreciated as of version 3.14
      /*  var shadow_size   = new google.maps.Size(32, 32)
      ,   shadow_origin = new google.maps.Point(40, 437)
      ,   shadow        = new google.maps.MarkerImage("../img/s.png", shadow_size, shadow_origin, null, null)
*/
      // loop through search results and get lat/lng and title
      var markers = [];
      $(marker_sel).each( function() {
        var self = $(this);
        coords.push(new google.maps.LatLng($(this).attr('data-map-lat'), $(this).attr('data-map-lng')));
        var new_coords = coords[count];
        var marker = new google.maps.Marker({
          position: new_coords,
          map : map,
          icon : icon,
          //shadow : shadow,
          title: $(this).find('.property-preview__title').text()
        });
        markers.push(marker);

        bounds.extend(new_coords);

        // center map on click of marker button + a bit of zoom
        $(this).find(".property-preview__map-trigger").on("click", function() {
          $(marker_sel).removeClass('active');
          self.addClass('active');
          for (var i = 0, len = markers.length; i < len; i++) {
            console.log(markers[i]);
            markers[i].setIcon(icon);
            markers[i].setZIndex(99);
          }
          map.panTo(new_coords);
          marker.setIcon(selected);
          marker.setZIndex(100);
          //map.setZoom(18);
        });
        count++;

        // Scroll to listing on marker click
        google.maps.event.addListener(marker, 'click', function() {
          $(marker_sel).removeClass('active');
          for (var i = 0, len = markers.length; i < len; i++) {
            console.log(markers[i]);
            markers[i].setIcon(icon);
            markers[i].setZIndex(99);
          }
          self.addClass('active');
          $('body').stop().animate({
            scrollTop: self.offset().top - 95
          }, 2000);
          this.setIcon(selected);
          this.setZIndex(100);

        });
      });
      // fit map to bounds
      map.fitBounds(bounds);



    },

    customMultiSelect : function() {

      //var select_box_html = '<div class="multi-select">'
      //this.addClass('hidden');

    }
  });

  $(document).ready( function() {

    // Set up map
    $('.search-map').setMapHeight().initialiseMaps('.property-preview__item');
    $(window).resize( function() {
      $('.search-map').setMapHeight();
    });

    $(document).on("scroll", function() {
      // check scroll for passing .inside-search and make
      // map + inside search fixed if so.
      var map_width = $('.map-holder').width();
      if ($('html, body').scrollTop() > $('.breadcrumbs').offset().top + $('.breadcrumbs').height()) {
        $('.inside-search, .map-holder').addClass('sticky');
        $('.map-holder').width(map_width).css({"top": $('.inside-search').height() + 30 });
      } else {
        $('.inside-search, .map-holder').removeClass('sticky').removeAttr('style');
      }
    });
  });

})(jQuery);

