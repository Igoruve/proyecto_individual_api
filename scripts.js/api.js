const BASE_URL = "https://swapi.dev/api/";

async function fetchData(url) {
  try {
    const finalURL = new URL(BASE_URL + url);
    const response = await fetch(finalURL.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function getCharacterByName(name) {
  const url = `people/?search=${name}`;
  const result = await fetchData(url);
  return result[0];
}

async function getPlanetByName(planet) {
  const url = `planets/?search=${planet}`;
  const result = await fetchData(url);
  console.log(result);
  return result[0];
}

async function getStarshipByName(starship) {
  const url = `starships/?search=${starship}`;
  const result = await fetchData(url);
  console.log(result);
  return result[0];
}

async function getFilmByName(film) {
  const url = `films/?search=${film}`;
  const result = await fetchData(url);
  console.log(result);
  return result[0];
}

async function getSpeciesByName(species) {
  const url = `species/?search=${species}`;
  const result = await fetchData(url);
  console.log(result);
  return result[0];
}

export {
  getFilmByName,
  getCharacterByName,
  getPlanetByName,
  getSpeciesByName,
  getStarshipByName
};  
