 /* Carousel */
  function initialiseCarouselHomepage() {
    $('.carousel-agent').flexslider({
      animation: "slide",
      slideshow: false,
      selector: ".carousel-list > .carousel-item",
      directionNav: false,
      controlNav: false,
      useCSS: true,
      touch: true
    });
  }
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





  $(document).ready( function() {
    // Start maps
    //initialiseMaps();
    // Start Carousel
   // initialiseCarouselHomepage();
    $('#pr-type').click(function(){
    	$('#pr-type-drdown').show('fast');
    });
    $('#pr-type-hack').click(function(){
    	$('#pr-type-drdown').show('fast');
    });
    $('#pr-type-drdown li').click(function(){
    	console.log($(this));
    	$('#pr-type').html($(this).html());
    	$('#pr-type-drdown').hide('fast');
    });
    $('.icn-map-s').mouseover(function(){
    	$(this).attr('src','img/i-icn-map-over.png');
    });
    $('.icn-map-s').mouseout(function(){
    	$(this).attr('src','img/i-icn-map.png');
    });
});