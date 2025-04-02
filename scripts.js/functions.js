import { getFromLocalStorage } from "./favs.js";

function showFavorites() {
  const favsContainer = document.getElementById("favorites");
  console.log(favsContainer);
  favsContainer.innerHTML = "";

  const categorias = Object.keys(localStorage);

  categorias.forEach((categoria) => {
    const favorites = getFromLocalStorage(categoria) || [];

    favorites.forEach((favorito) => {
      const item = document.createElement("div");
      item.classList.add("fav-item");
      item.innerHTML = `
              <div>${favorito}</div>
          `;
      favsContainer.appendChild(item);
    });
  });
}

export { showFavorites };
