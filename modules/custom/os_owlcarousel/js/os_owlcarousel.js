(function ($) {
  Drupal.behaviors.osOwlCarousel = {
    attach: function (context, settings) {
      $('.view-landing-carousel #widget_pager_bottom_landing_carousel-block_2').owlCarousel({
        items: 5,
        margin: 5,
        nav:true,
        responsiveClass:true,
        responsive:{
          0: {
            items: 3
          },
          600:{
            items: 4
          },
          1000:{
            items: 5
          }
        }
      });
      $('.view-landing-carousel #widget_pager_bottom_landing_carousel-block_2').addClass('owl-carousel');
    }
  };
})(jQuery);