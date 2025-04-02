import {
  getFilmByName,
  getCharacterByName,
  getPlanetByName,
  getSpeciesByName,
  getStarshipByName,
} from "./api.js";

import { addToLocalStorageArray } from "./favs.js";

async function fetchItemFromUrl(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchItems(urls) {
  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  if (urls && urls.length > 0) {
    let itemsData = [];
    for (let url of urls) {
      let data = await fetchItemFromUrl(url);
      let value = data.name || data.title || "Unknown";
      itemsData.push(value);
    }
    return itemsData.join(", ");
  }
  return "";
}

class Characters {
  constructor(
    name,
    birth_year,
    gender,
    height,
    mass,
    homeworld,
    films,
    starships,
    eye_color,
    hair_color,
    skin_color
  ) {
    this.name = name;
    this.birth_year = birth_year;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.homeworld = homeworld;
    this.films = films;
    this.eye_color = eye_color;
    this.hair_color = hair_color;
    this.skin_color = skin_color;
    (this.starships = starships), (this.promptElement = null);
  }
}

class Films {
  constructor(
    title,
    episode_id,
    release_date,
    director,
    producer,
    opening_crawl,
    characters,
    planets,
    starships,
    species
  ) {
    this.title = title;
    this.episode_id = episode_id;
    this.release_date = release_date;
    this.director = director;
    this.producer = producer;
    this.opening_crawl = opening_crawl;
    this.people = characters;
    this.planets = planets;
    this.starships = starships;
    this.species = species;
  }
}

class Planets {
  constructor(
    name,
    climate,
    terrain,
    population,
    diameter,
    gravity,
    residents,
    films,
    orbital_period,
    rotation_period,
    surface_water
  ) {
    this.name = name;
    this.climate = climate;
    this.terrain = terrain;
    this.population = population;
    this.diameter = diameter;
    this.gravity = gravity;
    this.people = residents;
    this.films = films;
    this.orbital_period = orbital_period;
    this.rotation_period = rotation_period;
    this.surface_water = surface_water;
  }
}

class Species {
  constructor(
    name,
    language,
    classification,
    average_lifespan,
    average_height,
    skin_colors,
    films,
    people,
    designation,
    eye_colors,
    hair_colors
  ) {
    this.name = name;
    this.language = language;
    this.classification = classification;
    this.average_lifespan = average_lifespan;
    this.average_height = average_height;
    this.skin_colors = skin_colors;
    this.films = films;
    this.people = people;
    this.designation = designation;
    this.eye_colors = eye_colors;
    this.hair_colors = hair_colors;
  }
}

class Starships {
  constructor(
    name,
    model,
    crew,
    passengers,
    starship_class,
    films,
    pilots,
    length,
    max_atmosphering_speed,
    hyperdrive_rating,
    cost_in_credits,
    cargo_capacity,
    consumables,
    manufacturer
  ) {
    this.name = name;
    this.model = model;
    this.people = passengers;
    this.starship_class = starship_class;
    this.films = films;
    this.crew = crew;
    this.people = pilots;
    this.consumables = consumables;
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.cost_in_credits = cost_in_credits;
    this.hyperdrive_rating = hyperdrive_rating;
    this.length = length;
    this.cargo_capacity = cargo_capacity;
    this.manufacturer = manufacturer;
  }
}

class Manager {
  constructor(query, selectedCategory) {
    (this.query = query), (this.selectedCategory = selectedCategory);
  }

  async browser() {
    let results = [];
    if (this.selectedCategory === "people") {
      results = await getCharacterByName(this.query);
    } else if (this.selectedCategory === "planets") {
      results = await getPlanetByName(this.query);
    } else if (this.selectedCategory === "starships") {
      results = await getStarshipByName(this.query);
    } else if (this.selectedCategory === "films") {
      results = await getFilmByName(this.query);
    } else if (this.selectedCategory === "species") {
      results = await getSpeciesByName(this.query);
    }

    console.log("Results:", results, typeof results);

    results = Array.isArray(results) ? results : [results];

    this.renderResults(results);
  }

  async renderResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (!Array.isArray(results) || results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }

    for (let result of results) {
      let peopleString = "";
      if (result.people && result.people.length > 0) {
        peopleString = await fetchItems(result.people);
      }
      let residentsString = "";
      if (result.residents && result.residents.length > 0) {
        residentsString = await fetchItems(result.residents);
      }
      let pilotsString = "";
      if (result.pilots && result.pilots.length > 0) {
        pilotsString = await fetchItems(result.pilots);
      }
      let filmsString = "";
      if (result.films && result.films.length > 0) {
        filmsString = await fetchItems(result.films);
      }
      let planetsString = "";
      if (result.planets && result.planets.length > 0) {
        planetsString = await fetchItems(result.planets);
      }
      let homeworldString = "";
      if (result.homeworld) {
        homeworldString = await fetchItems(result.homeworld);
      }
      let speciesString = "";
      if (result.species) {
        speciesString = await fetchItems(result.species);
      }
      let starshipsString = "";
      if (result.starships && result.starships.length > 0) {
        starshipsString = await fetchItems(result.starships);
      }

      const item = document.createElement("div");
      item.classList.add("result-item");

      let details = "";
      let dataType = "";
      if (result.birth_year) {
        dataType = "birth_year";
        details = `
              <h3>Birth Year:</h3> <p>${result.birth_year}</p>
              <h3>Gender:</h3> <p>${result.gender}</p>
              <h3>Height:</h3> <p>${result.height} cm</p>
              <h3>Weight:</h3> <p>${result.mass} kg</p>
              <h3>Eye Color:</h3> <p>${result.eye_color}</p>
              <h3>Hair Color:</h3> <p>${result.hair_color}</p>
              <h3>Skin Color:</h3> <p>${result.skin_color}</p>
              <h3>Homeworld:</h3> <p>${homeworldString}</p>
              <h3>Films:</h3> <p>${filmsString}</p>
              <h3>Starships:</h3> <p>${starshipsString}</p>
              <button id="fav-button">Save Favorite Destination</button>
            `;
      } else if (result.director) {
        dataType = "director";
        details = `
            <h3>Episode:</h3> <p>${result.episode_id}</p>
            <h3>Release Date:</h3> <p>${result.release_date}</p>
            <h3>Director:</h3> <p>${result.director}</p>
            <h3>Producer:</h3> <p>${result.producer}</p>
            <h3>Opening:</h3> <p>${result.opening_crawl}</p>
            <h3>Planets:</h3> <p>${planetsString}</p>
            <h3>Starships:</h3> <p>${starshipsString}</p>
            <h3>Species:</h3> <p>${speciesString}</p>
            <button id="fav-button">Save Favorite Destination</button>
              `;
      } else if (result.climate) {
        dataType = "climate";
        details = `
              <h3>Climate:</h3> <p>${result.climate}</p>
              <h3>Terrain:</h3> <p>${result.terrain}</p>
              <h3>Population:</h3> <p>${result.population} persons</p>
              <h3>Diameter:</h3> <p>${result.diameter} km</p>
              <h3>Gravity:</h3> <p>${result.gravity}</p>
              <h3>Surface Water:</h3> <p>${result.surface_water}%</p>
              <h3>Orbital Period:</h3> <p>${result.orbital_period} days</p>
              <h3>Rotation Period:</h3> <p>${result.rotation_period} hours</p>
              <h3>Residents:</h3> <p>${residentsString}</p>
              <h3>Films:</h3> <p>${filmsString}</p>
              <button id="fav-button">Save Favorite Destination</button>
            `;
      } else if (result.model) {
        dataType = "model";
        details = `
              <h3>Model:</h3> <p>${result.model}</p>
              <h3>Passengers:</h3> <p>${result.passengers}</p>
              <h3>Class:</h3> <p>${result.starship_class}</p>
              <h3>Crew:</h3> <p>${result.crew}</p>
              <h3>Model:</h3> <p>${result.model}</p>
              <h3>Films:</h3> <p>${filmsString}</p>
              <h3>Pilots:</h3> <p>${pilotsString}</p>
              <h3>Consumables:</h3> <p>${result.consumables}</p>
              <h3>Speed:</h3> <p>${result.max_atmosphering_speed}</p>
              <h3>Cost:</h3> <p>${result.cost_in_credits} credits</p>
              <h3>Hyperdrive Rating:</h3> <p>${result.hyperdrive_rating}</p>
              <h3>Manufacturer:</h3> <p>${result.manufacturer}</p>
              <h3>Length:</h3> ${result.length} m</p>
              <h3>Cargo capacity:</h3> <p>${result.cargo_capacity} kg</p>
              <button id="fav-button">Save Favorite Destination</button>
            `;
      } else if (result.language) {
        dataType = "language";
        details = `
              <h3>Language:</h3> <p>${result.language}</p>
              <h3>Classification:</h3> <p>${result.classification}</p>
              <h3>Average Lifespan:</h3> <p>${result.average_lifespan} years</p>
              <h3>Average Height:</h3> <p>${result.average_height} cm</p>
              <h3>Eye Colors:</h3> <p>${result.eye_colors}</p>
              <h3>Hair Colors:</h3> <p>${result.hair_colors}</p>
              <h3>Skin Colors:</h3> <p>${result.skin_colors}</p>
              <h3>Designation:</h3> <p>${result.designation}</p>
              <h3>Films:</h3> <p>${filmsString}</p>
              <h3>People:</h3> <p>${peopleString}</p>
              <button id="fav-button">Save Favorite Destination</button>
            `;
      }
      item.innerHTML = `<h2>${result.name || result.title}</h2>${details}`;
      resultsContainer.appendChild(item);
      document.querySelector("#fav-button").addEventListener("click", () => {
        addToLocalStorageArray(dataType, details);
      });
    }
  }
}

export { Characters, Films, Planets, Species, Starships, Manager };
