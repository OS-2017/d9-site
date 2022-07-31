(function ($) {
  'use strict';
  Drupal.behaviors.ahrq_home_carousel = {
    attach: function (context, settings) {

      // default numbers defined in initCycle and used to display the arrows
      var defaultNum = 0;
      var counter = 0;

      var bWidth = $(document).width(); // Getting the width and checking my layout

      // Get the total number of slides in the carousel
      // If 4, hide next button, else display
      var numImg = $('#hp-row3 img').length;

      function initCycle() {

        // make carousel visible to user.  It is hidden during page load because
        // when resized we don't want the user to see the carousel being manipulated
        // into the correct layout.
        $(".cycle-slideshow.cycle-hp-slideshow").css("display", "block");

        if (bWidth < 768) {
          defaultNum = 1;
          counter = 1;
          $('.cycle-slideshow').cycle({
            fx: 'carousel',
            timeout: 0,
            speed: 600,
            manualSpeed: 400,
            slides: '> div',
            next: '.cycle-next',
            prev: '.cycle-prev',
            carouselVisible: 1,
            carouselFluid: true,
            fit: 1,
            carouselSlideDimension: '180px',
            allowWrap: false
          });
        } else if (bWidth > 768 && bWidth < 979) {
          defaultNum = 2;
          counter = 2;
          $('.cycle-slideshow').cycle({
            fx: 'carousel',
            timeout: 0,
            speed: 600,
            manualSpeed: 400,
            slides: '> div',
            next: '.cycle-next',
            prev: '.cycle-prev',
            carouselVisible: 2,
            carouselFluid: true,
            carouselSlideDimension: '180px',
            allowWrap: false
          });
          //add additional padding to left so that slides are centered on screen
          $("#hp-row3 .cycle-slideshow .cycle-carousel-wrap .cycle-slide div").attr('style', 'margin-left: 40px');
        } else if (bWidth > 979 && bWidth < 1460) {
          defaultNum = 3;
          counter = 3;
          $('.cycle-slideshow').cycle({
            fx: 'carousel',
            timeout: 0,
            speed: 600,
            manualSpeed: 400,
            slides: '> div',
            next: '.cycle-next',
            prev: '.cycle-prev',
            carouselVisible: 3,
            carouselFluid: true,
            carouselSlideDimension: '180px',
            allowWrap: false
          });
          //add additional padding to left so that slides are centered on screen
          $("#hp-row3 .cycle-slideshow .cycle-carousel-wrap .cycle-slide div").attr('style', 'margin-left: 30px');
        } else {
          //console.log ("entered 4 visible slides display.");
          defaultNum = 4;
          counter = 4;
          $('.cycle-slideshow').cycle({
            fx: 'carousel',
            timeout: 0,
            speed: 600,
            manualSpeed: 600,
            slides: '> div',
            next: '.cycle-next',
            prev: '.cycle-prev',
            carouselVisible: 4,
            carouselFluid: true,
            carouselSlideDimension: '180px',
            allowWrap: false
          });

          //Hide next arrow if only 4 slides are in carousel
          if (numImg === 4) {
            $("#hp-row3 .next-arrow").hide();
          } else {
            $("#hp-row3 .next-arrow").show();
          }
        }
        // need to add the target=_blank attribute to the A elements.
        $('#hp-row3 .cycle-slideshow .cycle-carousel-wrap .cycle-slide div a').each(function(e) {
          if ($(this).hasClass('new-window-True')) {
            $(this).attr('target','_blank');
          }
        });

      }
        initCycle();

        /*
         Refresh page on breakpoints.  This allows jQuery Cycle2 to display the correct number of slides, especially when on
         smaller devices that differ vertically and horizontally.

         .bind() is called to make sure Firefox doesn't give us issues (known issue for the browser not to call resize)

         jQuery Cycle2 functions .cycle('destroy') and reinit_cycle()  do not work!
         Tried using their functions at the break points to allow carousel to reinitialize itself, but
         they didn't play nice.
         */
        // initial width of browser. Needed to determine if carousel will need
        // to reset its layout based on media type and num of slides to display
        var initWidth = $(window).width();

        $(window).bind('resize', function (e) {
          var newWidth = $(this).width();

          if (initWidth <= 427) {
            if (newWidth > 427) {
              reloadThePage();
            }
          } else if (initWidth >= 428 && initWidth <= 768) {
            if (newWidth > 768 || newWidth < 428) {
              reloadThePage();
            }
          } else if (initWidth >= 768 && initWidth <= 979) {
            if (newWidth < 768 || newWidth > 979) {
              reloadThePage();
            }
          } else if (initWidth >= 979 && initWidth <= 1460) {
            if (newWidth < 979 || newWidth > 1460) {
              reloadThePage();
            }
          } else if (initWidth >= 1600) {
            if (newWidth < 1600) {
              reloadThePage();
            }
          } //end IF
        });

        /*
          reloadThePage(): set the carousel to display none, then reset carousel
          layout to fit the correct media query (which is done in initCycle)
         */
        function reloadThePage() {
          // hide the carousel so user doesn't see the it being manipulated
          // to the correct screen size.
          $(".cycle-slideshow.cycle-hp-slideshow").css("display", "none");

          if (window.RT) clearTimeout(window.RT);
          window.RT = setTimeout(function () {
            this.location.reload(false); /* false to get page from cache */
          }, 100);
        }

        /*
        displayArrows()
        */
       // var defaultNum = 4; //default number of images on homepage
       // var counter = 4; //starting at default number and moving on up!
        var maxNum = numImg; //retrieved from numImg declared at top of script

        $("#hp-row3 div.prev-arrow").hide();  //hide the previous arrow on load because there is no place to go back to!

        $("#hp-row3 .next-arrow").click(function () {
          if (counter < maxNum) {
            counter++;
            //$('#hp-row3 .prev-arrow').show();
          }
          $('#hp-row3 .prev-arrow').show();

          //if ($('#hp-row3 .cycle-slide').last().is(':visible')) {
          if (counter >= maxNum) {
            $("#hp-row3 .next-arrow").hide();
          }
          //}
        });

        $('#hp-row3 .prev-arrow').click(function () {
          if (counter > defaultNum) { //default
            counter--;
          }
          $("#hp-row3 .next-arrow").show();
          if (counter === defaultNum) {
            $('#hp-row3 .prev-arrow').hide();
          }
        });

        /*
        setNextArrow()
          Right arrow doesn't set well in IE when done in CSS.  Alternative:
          get innerWidth of the div holding All carousel components (.view-queues-features-med),
          get innerWidth of the right arrow
          Do a few calculations and now we have the position of the right arrow that works EVERYWHERE
         */
        function setNextArrow() {var wCarousel = $('#hp-row3 .view-misc-entityqueues-med-features').innerWidth();
          var wArrow = $('#hp-row3 .next-arrow').innerWidth();

//          console.log ("bWidth: " + bWidth + "; wCarousel: " + wCarousel + "; wArrow: " + wArrow);

          var setRight = ((bWidth - wCarousel) - wArrow) / 2;
//          console.log ("setRight is: " + setRight);
          $('#hp-row3 .next-arrow').css('right', setRight);
        }
      //setNextArrow();

    }
  };
})(jQuery);
