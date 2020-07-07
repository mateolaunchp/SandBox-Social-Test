'use strict';

$(document).ready(function() {
	$(window).scroll(function() {
  	if($(document).scrollTop() > 10) {
        $('#nav-bar').addClass('scrolling');
    }
    else {
    $('#nav-bar').removeClass('scrolling');
    }
  });
});


$.fn.isInViewport = function() {
  // var elementTop = $(this).offset().top;
  // var elementBottom = elementTop + $(this).outerHeight();
  //
  // var viewportTop = $(window).scrollTop();
  // var viewportBottom = viewportTop + $(window).height();
  //
  // return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
  if ($('#animated-img1').isInViewport()) {
    $('#animated-img1').addClass('see-me');
      // do something
  } else {
    $('#animated-img1').removeClass('see-me');
      // do something else
  }
});

$(window).on('resize scroll', function() {
  if ($('#animated-img2').isInViewport()) {
    $('#animated-img2').addClass('see-me');
      // do something
  } else {
    $('#animated-img2').removeClass('see-me');
      // do something else
  }
});