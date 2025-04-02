document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.getElementById("section__nav__text");
  const header = document.getElementById("header");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("show");
    header.classList.toggle("active");
  });
});
