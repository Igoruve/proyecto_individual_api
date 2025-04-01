import {
  getFilmByName,
  getCharacterByName,
  getPlanetByName,
  getSpeciesByName,
  getStarshipByName,
} from "./api.js";

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

      if (result.birth_year) {
        details = `
              <p><strong>Birth Year:</strong> ${result.birth_year}</p>
              <p><strong>Gender:</strong> ${result.gender}</p>
              <p><strong>Height:</strong> ${result.height} cm</p>
              <p><strong>Weight:</strong> ${result.mass} kg</p>
              <p><strong>Eye Color:</strong> ${result.eye_color}</p>
              <p><strong>Hair Color:</strong> ${result.hair_color}</p>
              <p><strong>Skin Color:</strong> ${result.skin_color}</p>
              <p><strong>Homeworld:</strong> ${homeworldString}</p>
              <p><strong>Films:</strong> ${filmsString}</p>
              <p><strong>Starships:</strong> ${starshipsString}</p>
            `;
      } else if (result.director) {
        details = `
            <p><strong>Episode:</strong> ${result.episode_id}</p>
            <p><strong>Release Date:</strong> ${result.release_date}</p>
            <p><strong>Director:</strong> ${result.director}</p>
            <p><strong>Producer:</strong> ${result.producer}</p>
            <p><strong>Opening:</strong> ${result.opening_crawl}</p>
            <p><strong>Planets:</strong> ${planetsString}</p>
            <p><strong>Starships:</strong> ${starshipsString}</p>
            <p><strong>Species:</strong> ${speciesString}</p>
              `;
      } else if (result.climate) {
        details = `
              <p><strong>Climate:</strong> ${result.climate}</p>
              <p><strong>Terrain:</strong> ${result.terrain}</p>
              <p><strong>Population:</strong> ${result.population} persons</p>
              <p><strong>Diameter:</strong> ${result.diameter} km</p>
              <p><strong>Gravity:</strong> ${result.gravity}</p>
              <p><strong>Surface Water:</strong> ${result.surface_water}%</p>
              <p><strong>Orbital Period:</strong> ${result.orbital_period} days</p>
              <p><strong>Rotation Period:</strong> ${result.rotation_period} hours</p>
              <p><strong>Residents:</strong> ${residentsString}</p>
              <p><strong>Films:</strong> ${filmsString}</p>
            `;
      } else if (result.model) {
        details = `
              <p><strong>Model:</strong> ${result.model}</p>
              <p><strong>Passengers:</strong> ${result.passengers}</p>
              <p><strong>Class:</strong> ${result.starship_class}</p>
              <p><strong>Crew:</strong> ${result.crew}</p>
              <p><strong>Model:</strong> ${result.model}</p>
              <p><strong>Films:</strong> ${filmsString}</p>
              <p><strong>Pilots:</strong> ${pilotsString}</p>
              <p><strong>Consumables:</strong> ${result.consumables}</p>
              <p><strong>Speed:</strong> ${result.max_atmosphering_speed}</p>
              <p><strong>Cost:</strong> ${result.cost_in_credits} credits</p>
              <p><strong>Hyperdrive Rating:</strong> ${result.hyperdrive_rating}</p>
              <p><strong>Manufacturer:</strong> ${result.manufacturer}</p>
              <p><strong>Length:</strong> ${result.length} m</p>
              <p><strong>Cargo capacity:</strong> ${result.cargo_capacity} kg</p>
            `;
      } else if (result.language) {
        details = `
              <p><strong>Language:</strong> ${result.language}</p>
              <p><strong>Classification:</strong> ${result.classification}</p>
              <p><strong>Average Lifespan:</strong> ${result.average_lifespan} years</p>
              <p><strong>Average Height:</strong> ${result.average_height} cm</p>
              <p><strong>Eye Colors:</strong> ${result.eye_colors}</p>
              <p><strong>Hair Colors:</strong> ${result.hair_colors}</p>
              <p><strong>Skin Colors:</strong> ${result.skin_colors}</p>
              <p><strong>Designation:</strong> ${result.designation}</p>
              <p><strong>Films:</strong> ${filmsString}</p>
              <p><strong>People:</strong> ${peopleString}</p>
            `;
      }

      item.innerHTML = `<h1>${result.name || result.title}</h1>${details}`;
      resultsContainer.appendChild(item);
    }
  }
}

export { Characters, Films, Planets, Species, Starships, Manager };
