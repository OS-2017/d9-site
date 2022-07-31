/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

'use strict';

Drupal.behaviors.os_slick_slider = {
    attach: function (context, settings) {
//code start
//Slick Slider carousel
$(".slider").slick({

  // normal options...
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
 // autoplay: false,
//  autoplaySpeed: 2000,

  // responsive
    responsive: [{

        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: true,
          arrows: true,
        }

      }, {

        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          dots: false,
        }

      }, {

        breakpoint: 500,
        settings: "unslick" // destroys slick

      }]
    });
//end of code

  }
};
    

  Drupal.behaviors.os_flex_slider = {
      attach: function (context, settings) {
      $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 300,
        itemMargin: 5
      });
 
 //end of code   
    }
  };

})(jQuery, Drupal);
