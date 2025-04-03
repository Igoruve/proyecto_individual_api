import { Manager } from "./classes.js";

const managerFav = new Manager;

const home = document.querySelector("#home");
const browserSection = document.querySelector("#browser-section");
const results = document.querySelector("#results");
const input = document.querySelector("#input");

home.addEventListener("click", () => {
  results.style.display = "none";
  favoritesSection.style.display = "none";
  browserSection.style.display = "block";
  input.value = "";
});

const favorites = document.querySelector("#favorites-page");
const favoritesSection = document.querySelector("#favorites");

favorites.addEventListener("click", () => {
  favoritesSection.style.display = "block";
  browserSection.style.display = "none";
  managerFav.renderFavorites();
});
