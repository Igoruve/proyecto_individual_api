form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  const type = searchType.value;

  if (query === "") {
    alert("Type something...");
    return;
  }

  let result;

  if (type === "character") {
    result = await getCharacterByName(query);
  } else if (type === "planet") {
    result = await getPlanetByName(query);
  } else if (type === "starship") {
    result = await getStarshipByName(query);
  } else if (type === "film") {
    result = await getFilmByName(query);
  } else if (type === "species") {
    result = await getSpeciesByName(query);
  } else {
    alert("Select a valid type, please");
    return;
  }

  renderResults(result);
});
