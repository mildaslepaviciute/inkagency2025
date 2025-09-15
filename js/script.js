// Get the current year for the copyright 

$('#year').text(new Date().getFullYear());

// Lightbox

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault()
    $(this).ekkoLightbox({
        alwaysShowClose: true,
    })
})

// CAROUSEL TIMING

$(".carousel").carousel({
    interval: 3500,
    keyboard: true,
    pause: "hover",
  });

// Simple onclick event

// $("#.classOrId").click(function(){
//     $(".classOrId").removeClass("class");
//     $(".classOrId").addClass("class");
// });


// AOS animations

AOS.init({
  // Global settings:
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,

  // Can be overridden by `data-aos-*` attributes:
  offset: 120,
  delay: 0,
  duration: 500,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});