/*
site: homehound.com.au
file: global.js
version: 0.0.1
*/

/*
 * table of contents
 *
 * Class Toggle
 * Carousel
 * Map
 * Select Element Manipulation
 *
 *
 */

/* 1. Class Toggle // In progress */
(function() {
  'use strict';

  var switchClass = function() {
    var $t = $(this)
    ,   els_to_toggle     = $t.attr('data-tog-el')
    ,   els_toggle_class  = $t.attr('data-tog-el-class')
    ,   this_toggle_class = $t.attr('data-tog-this-class') !== undefined ? $t.attr('data-tog-this-class') : false
    ,   toggle_all        = $t.attr('data-tog-all') !== undefined ? true : false
    ,   toggle_group      = $t.attr('data-tog-group') !== undefined ? true : false;
    // Toggles all instances of el_to_toggle on click
    if (toggle_all) {
      $t.on("click", function() {
        $(els_to_toggle).toggleClass(els_toggle_class);
        if (this_toggle_class) {
          $t.toggleClass(this_toggle_class);
        }
      });
    } else {
      $t.on("click", function(e) {
        e.stopPropagation();
        // Get all simlar instances of this
        var self = $(this)
        ,   data_class = self.attr('data-tog-el')
        ,   $similar_els = $('[data-tog-el="'+data_class+'"]')
        ,   self_index = 0;

        // Find which instance is the current one
        for (var i = 0, len = $similar_els.length; i < len; i++) {
          if ($similar_els.eq(i)[0] == self[0]) {
            // Toggle class on els_to_toggle with same index
            $(els_to_toggle).eq(i).toggleClass(els_toggle_class);
          } else if (toggle_group) {
          // Turn all other instances of els_to_toggle off
            $(els_to_toggle).eq(i).removeClass(els_toggle_class);
          }
        }
      });
    }
  }

  /* Carousel */
  function initialiseCarousel() {
    $('.carousel').flexslider({
      animation: "slide",
      selector: ".carousel-list > .carousel-item",
      directionNav: true,
      controlNav: false,
      useCSS: true,
      touch: true
    });
  }

  /* Map */
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

  function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=false&' +
        'callback=initialiseMaps';
    document.body.appendChild(script);
  }

  /* Select Element Manipulation*/
  var selectManipulation = function() {
    var self = $(this)
    ,   select_el     = self.find('select')
    ,   option_els    = select_el.find('option')
    ,   option_len    = option_els.length
    ,   wrap_html     = '<div class="select-container">'
    ,   span_html     = '<span class="span-select" data-tog data-tog-el=".list-options" data-tog-el-class="show" data-tog-group></span>'
    ,   list_html     = '<ul class="list-options"></ul>'
    ,   icon_label    = self.attr('data-select-icon') !== undefined ? true : false;

    // Wrap Select with a container
    select_el.wrap(wrap_html);
    var container = select_el.parent();
    // Add fake select span
    container.append(span_html);
    var fake_select = container.find('span');
    // Add fake drop down container
    container.append(list_html);
    var option_ctnr = container.find('ul');
    fake_select.html(option_els.eq(0).html());
    if (icon_label) {
      var icon_class = self.find('label').text().toLowerCase();
      fake_select.addClass('icn-'+icon_class);
    }
    for (var i = 0; i < option_len; i++) {
      option_ctnr.append('<li class="list-options-item">'+option_els.eq(i).html()+'</li>');
    }

    var fake_options = option_ctnr.find('li');
    fake_options.on("click", function(e) {
      e.stopPropagation();
      // Switch html in fake select box
      fake_select.html($(this).html());
      // Hide the fake drop down
      $(this).parent().removeClass('show');
      // Send the selected option to the real select box
      var index = $(this).index();
      select_el[0].options.selectedIndex = index;
    });
  }

  /* Quick Search Inputs */
  var quickSearchManipulation = function() {
    var self = $(this)
    ,   text_input = self.find('input[type="text"]')
    ,   wrap_html   = '<div class="quick-search"></div>'
    ,   append_html = '<button type="button" class="quick-search-close"></button><ul class="quick-search-options"></ul>';

    // Wrap input box
    text_input.wrap(wrap_html);
    var quick_search = self.find('.quick-search');
    // Append search results list
    quick_search.append(append_html);
    var option_list = self.find('.quick-search-options');
    var fake_results = ['dynamic', 'search', 'results', 'requires', 'some', 'ajax'];
    for (var i = 0, len = fake_results.length; i < len; i++) {
      option_list.append('<li class="quick-search-option">'+fake_results[i]+'</li>');
    }

    // Clicked quick search option is added to input value
    $('.quick-search-option').on("mousedown", function() {
      var self  = $(this)
      ,   input = $(this).text();

      self.parent().prev().val(input);
    });


  }

  /* Shortlist Toggle */
  var shortlistToggle = function() {
    var self    = $(this)
    ,   listed  = self.hasClass('listed') ? true : false
    ,   title_listed = "Remove from Shortlist"
    ,   title_unlisted = "Add to Shortlist";

    if (listed) {
      // Unlist Property
      // Do Ajax
      // -- //
      // Change appearance
      self.removeClass('listed').attr('title', title_unlisted);
    } else {
      // List Property
      // Do Ajax
      // -- //
      // Change appearance
      self.addClass('listed').attr('title', title_listed);
    }
  }


  /* Document Ready */
  $(document).ready( function() {
    // Start maps
    //initialiseMaps();
    // Start Carousel
    initialiseCarousel();
    // Select Manipulation
    $('[data-stylised-select]').each(selectManipulation)
    // Quick Search Manipulation
    $('[data-input-quick-search]').each(quickSearchManipulation);
    // Add Suburb
    $('.add-suburb').on("click", function() {
       $(this).prev().removeClass('last-visible').addClass("visible");
       $(this).next().addClass('last-visible').after($(this));
    })
    // Remove Suburb
    $('.quick-search-close').on("click", function() {
      var index = $(this).index();
      $(this).parent().parent().removeClass('last-visible visible');
      $(this).parent().parent().prev().addClass('last-visible');
      $(this).parent().parent().before($('.add-suburb'));
    });
    // Shortlist Star Toggle
    $('.shortlist-star-small, .shortlist-star__large').on("click", shortlistToggle);
    // Start Toggle
    $('[data-tog]').each(switchClass);

  });

  /* Document Click Resets */
   $(document).click(function() {
      // Hide the fake drop down
      $('.list-options').removeClass('show');
   });


})(jQuery);

