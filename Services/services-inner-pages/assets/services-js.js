 // Ensure the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".processSwiper", {
      // Default (Mobile: viewport < 768px)
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,

      // Navigation
      navigation: {
        nextEl: ".process-next",
        prevEl: ".process-prev",
      },

      // Responsive Breakpoints
      breakpoints: {
        400: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // When window width is >= 768px (Tablet)
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // When window width is >= 1024px (Desktop)
        1115: {
          slidesPerView: 4,
          spaceBetween: 30,
        }
      }
    });
  });