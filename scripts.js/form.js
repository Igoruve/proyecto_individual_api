import { Manager } from "./classes.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#searchForm");
  const input = document.querySelector("#input"); 
  const searchType = document.querySelector("#stars");

  if (!form || !input || !searchType) {
    console.error("Error: Form elements not found.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const browserSection= document.querySelector("#browser-section");

    const query = input.value.trim();
    const type = searchType.value;

    if (query === "") {
      alert("Select a destination before lunch...");
      return;
    }
    
    browserSection.style.display="none";
    const manager = new Manager(query, type);
    manager.browser();

  });
});
