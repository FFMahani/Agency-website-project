// === Burger Menu ===

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".navbar ul");
  const burgerIcon = document.querySelector(".burger-menu");
  const closeIcon = document.querySelector(".close-menu");

  function openMenu() {
    menu.classList.add("menu-open");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    menu.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
  }

  burgerIcon.addEventListener("click", openMenu);
  closeIcon.addEventListener("click", closeMenu);

  document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      document.body.classList.remove("menu-open");
      menu.classList.remove("menu-open");
    }
  });
});
