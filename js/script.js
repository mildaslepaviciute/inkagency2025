document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".gallerySwiper", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  const portfolioSwiper = new Swiper(".portfolioSwiper", {
    loop: true,
    autoplay: false,
    // autoplay: {
    //     delay: 3500,
    //     pauseOnMouseEnter: true,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  // Video play on hover 
  const videos = document.querySelectorAll(".hover-video");

  videos.forEach(video => {
    video.addEventListener("mouseenter", () => {
      video.play();
    });

    video.addEventListener("mouseleave", () => {
      video.pause();
    });

    video.addEventListener("ended", () => {
      portfolioSwiper.slideNext();
    });
  });

  const video = document.getElementById("bg-video-desktop");
    video.play();
    video.onended = function () {
      init();
  };

  function init() {
    const elementsWithFadeIn = document.querySelectorAll('[data-fade-in]');

    elementsWithFadeIn.forEach(element => {
      const delay = parseFloat(element.getAttribute('data-fade-in-delay')) || 0;

      // Animate in
      gsap.to(element, {
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power2.out"
      });
    });
  }
});