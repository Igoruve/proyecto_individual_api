const home = document.querySelector("#home");
const browserSection = document.querySelector("#browser-section");
const results = document.querySelector("#results");

home.addEventListener("click", () => {
  results.style.display = "none";
  browserSection.style.display = "block";
});
