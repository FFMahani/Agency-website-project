// === Testimonial Carousel ===

const slides = document.querySelectorAll(".testimonial-slide");
const leftArrow = document.querySelector(".testimonial-nav.left");
const rightArrow = document.querySelector(".testimonial-nav.right");
const testimonialContainer = document.querySelector(".testimonial-container");
const dots = document.querySelectorAll(".testimonial-dot");

let currentIndex = 0;
let autoSlideInterval;
const autoSlideTime = 3000;

// Main slide function
function goToSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentIndex = index;

  // Show correct slide
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Activate correct dot
  dots.forEach((dot, i) => {
    dot.classList.toggle("testimonial-dot--active", i === index);
  });

  // Update background color
  const bgClass = slides[index].getAttribute("data-bg");
  testimonialContainer.classList.remove("bg-yellow", "bg-blue", "bg-green");
  testimonialContainer.classList.add(bgClass);
}

// Auto Slide Function
function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, autoSlideTime);
}

// Reset Auto Slide Timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Arrow navigation
leftArrow.addEventListener("click", () => {
  goToSlide(currentIndex - 1);
  resetAutoSlide();
});
rightArrow.addEventListener("click", () => {
  goToSlide(currentIndex + 1);
  resetAutoSlide();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    goToSlide(currentIndex - 1);
    resetAutoSlide();
  } else if (e.key === "ArrowRight") {
    goToSlide(currentIndex + 1);
    resetAutoSlide();
  }
});

// Dot navigation (click)
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goToSlide(i);
    resetAutoSlide();
  });

  // Pause auto-slide when hovering over a dot
  dot.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
  dot.addEventListener("mouseleave", startAutoSlide);
});

// Pause auto-slide on hover for container and arrows
[testimonialContainer, leftArrow, rightArrow].forEach(element => {
  element.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
  element.addEventListener("mouseleave", startAutoSlide);
});

// Init
goToSlide(0);
startAutoSlide();


