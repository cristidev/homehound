$(document).ready( function() {
    // Start maps
    //initialiseMaps();
    // Start Carousel
   initialiseCarouselGallery();
  
});

function initialiseCarouselGallery() {
    $('.carousel-list').flexslider({
      animation: "slide",
      slideshow: false,
      selector: ".carousel-list > .carousel-item",
      directionNav: false,
      controlNav: false,
      useCSS: true,
      touch: true
    });
  }