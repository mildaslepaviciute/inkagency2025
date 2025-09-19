// Get the current year for the copyright 

$('#year').text(new Date().getFullYear());


// Swiper.js

var swiper = new Swiper(".gallerySwiper", {
    effect: "fade",
    // speed: 500,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
});

var swiper = new Swiper(".portfolioSwiper", {
    loop: true,
    autoplay: {
        delay: 3500,
        pauseOnMouseEnter: true,
    },
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

const video = document.querySelectorAll(".hover-video");

video.addEventListener("mouseenter", () => {
    video.play();
});

video.addEventListener("mouseleave", () => {
    video.pause(); // no reset, playback stays where it stopped
});