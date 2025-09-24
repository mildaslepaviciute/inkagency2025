document.addEventListener("DOMContentLoaded", function () {

  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    const linkedinVideo = document.getElementById("linkedin-video");
    linkedinVideo.play();    
  }

  new Swiper(".gallerySwiper", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });

  const portfolioSwiper = new Swiper(".portfolioSwiper", {
    loop: true,
    autoplay: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        // First, pause ALL videos
        const allVideos = document.querySelectorAll(".hover-video, [data-play-in-view]");
        allVideos.forEach(video => {
          video.pause();
          video.currentTime = 0; // Reset to beginning
        });
                
        if (isMobile) {
          // Re-evaluate newly active slide video position
          setTimeout(() => {
            const newActiveSlide = portfolioSwiper.slides[portfolioSwiper.activeIndex];
            const newActiveVideo = newActiveSlide.querySelector('[data-play-in-view]');
            if (newActiveVideo) {
              ScrollTrigger.refresh();
              const triggers = ScrollTrigger.getAll();
              const trigger = triggers.find(t => t.trigger === newActiveVideo);
              if (trigger) {
                trigger.refresh();
                if (trigger.isActive) {
                  newActiveVideo.play();
                  newActiveVideo.classList.add("in-view");
                }
              }
            }
          }, 100);
        }
      },
    },
  });


  const video = document.getElementById("bg-video-desktop");
  video.play();

  video.addEventListener('timeupdate', function videoTimeCheck() {
    if (video.currentTime >= 2.5) {
      video.removeEventListener('timeupdate', videoTimeCheck);
      init();
    }
  });

  function init() {

    function initFadeInElements() {
      const elementsWithFadeIn = document.querySelectorAll('[data-fade-in]');

      elementsWithFadeIn.forEach(element => {
        const delay = parseFloat(element.getAttribute('data-fade-in-delay')) || 0;
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: delay,
          ease: "power2.out"
        });
      });
    }

    function initPlayInViewVideos() {
        const playInViewElements = document.querySelectorAll('[data-play-in-view]');

        playInViewElements.forEach(element => {
          const video = element;
          ScrollTrigger.create({
          trigger: element,
          start: "bottom bottom",
          end: "top top",
          markers: false,
          onEnter: () => {
            const activeSlide = portfolioSwiper.slides[portfolioSwiper.activeIndex];
            if (activeSlide.contains(video)) {
              video.play();
              video.classList.add("in-view");
            }
          },
          onEnterBack: () => {
            const activeSlide = portfolioSwiper.slides[portfolioSwiper.activeIndex];
            if (activeSlide.contains(video)) {
              video.play();
              video.classList.add("in-view");
            }
          },
          onLeave: () => {
            video.pause();
            video.classList.remove("in-view");
          },
          onLeaveBack: () => {
            video.pause();
            video.classList.remove("in-view");
          },
          });
        });
        
        playInViewElements.forEach(element => {
          element.addEventListener("ended", () => {
            portfolioSwiper.slideNext();
          });
        });
    }

    function initHoverVideos() {
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
    }

    // add hover effect to logo if its fully scrolled in view using scrolltrigger
    function initLogoHoverEffect() {
      const logo = document.getElementById("ink-logo");
      ScrollTrigger.create({
        trigger: "#ink-logo",
        start: "bottom bottom",
        end: "top top",
        onEnter: () => {
          logo.classList.add('hover-active');
        },
        onLeaveBack: () => {
          logo.classList.remove('hover-active');
        },
      });
    }
    
    gsap.registerPlugin(ScrollTrigger);
    initFadeInElements();
    initHoverVideos();
    if (isMobile) {
      initPlayInViewVideos();
      initLogoHoverEffect()
    }
  }
});