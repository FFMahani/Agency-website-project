// Select menu elements
const menu = document.querySelector(".navbar ul");
const navbar = document.querySelector(".navbar");
const burgerIcon = document.querySelector(".burger-menu");
const closeMenu = document.querySelector(".close-menu");

// Function to check screen size and toggle menu visibility
function updateMenuDisplay() {
  if (window.innerWidth >= 1024) {
    // Large screens: Always show menu, hide burger menu
    menu.style.opacity = "1";
    menu.style.visibility = "visible";
    menu.style.right = "0";
    navbar.classList.remove("mobile-menu"); // Ensure it's not styled for mobile
    burgerIcon.style.display = "none";
    closeMenu.style.display = "none";
  } else {
    // Mobile screens: Menu is hidden by default
    menu.style.opacity = "0";
    menu.style.visibility = "hidden";
    menu.style.right = "-100%";
    navbar.classList.add("mobile-menu"); // Apply mobile styles
    burgerIcon.style.display = "block";
    closeMenu.style.display = "none";
  }
}

// Function to open the menu (for mobile)
function openMenu() {
  if (window.innerWidth < 1024) {
    menu.style.opacity = "1"; // Make menu visible
    menu.style.visibility = "visible";
    menu.style.right = "0"; // Slide-in effect
    burgerIcon.style.display = "none"; // Hide burger icon
    closeMenu.style.display = "block"; // Show close icon
  }
}

// Function to close the menu (for mobile)
function closeMenuFunction() {
  if (window.innerWidth < 1024) {
    // Close menu only on small screens
    menu.style.opacity = "0";
    menu.style.visibility = "hidden";
    menu.style.right = "-100%";
    burgerIcon.style.display = "block"; // Show burger icon only for mobile
    closeMenu.style.display = "none"; // Hide close icon
  }
}

// Add event listeners
burgerIcon.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFunction);

// Ensure menu remains visible on large screens after clicking a link
document.querySelectorAll(".navbar ul li a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      closeMenuFunction(); // Close only on mobile
    }
  });
});

// Close menu when pressing ESC key (for mobile)
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && window.innerWidth < 1024) {
    closeMenuFunction();
  }
});

// Update menu visibility when resizing the window
window.addEventListener("resize", updateMenuDisplay);

// Ensure correct menu display when the page loads
window.addEventListener("load", updateMenuDisplay);




// ====================================
// ====== Testimonial Carousel ======

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


