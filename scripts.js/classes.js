import {
  getFilmByName,
  getCharacterByName,
  getPlanetByName,
  getSpeciesByName,
  getStarshipByName,
} from "./api.js";

async function fetchItems(urls, fetchFunction) {
  if (urls && urls.length > 0) {
    let itemsData = [];
    for (let url of urls) {
      let data = await fetchFunction(url);
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
    species,
    starships
  ) {
    this.name = name;
    this.birth_year = birth_year;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.homeworld = homeworld;
    this.films = films;
    this.species = species;
    this.starships = starships;
  }

  async fetchItems() {
    if (this.homeworld) {
      this.homeworld = await fetchItems([this.homeworld], getPlanetByName);
    }
    if (this.films && this.films.length > 0) {
      this.films = await fetchItems(this.films, getFilmByName);
    }
    if (this.species && this.species.length > 0) {
      this.species = await fetchItems(this.species, getSpeciesByName);
    }
    if (this.starships && this.starships.length > 0) {
      this.starships = await fetchItems(this.starships, getStarshipByName);
    }
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
    this.characters = characters;
    this.planets = planets;
    this.starships = starships;
    this.species = species;
  }

  async fetchItems() {
    if (this.planets && this.planets.length > 0) {
      this.planets = await fetchItems(this.planets, getPlanetByName);
    }
    if (this.films && this.films.length > 0) {
      this.films = await fetchItems(this.films, getFilmByName);
    }
    if (this.species && this.species.length > 0) {
      this.species = await fetchItems(this.species, getSpeciesByName);
    }
    if (this.starships && this.starships.length > 0) {
      this.starships = await fetchItems(this.starships, getStarshipByName);
    }
    if (this.characters && this.characters.length > 0) {
      this.characters = await fetchItems(this.characters, getCharacterByName);
    }
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
    films
  ) {
    this.name = name;
    this.climate = climate;
    this.terrain = terrain;
    this.population = population;
    this.diameter = diameter;
    this.gravity = gravity;
    this.residents = residents;
    this.films = films;
  }

  async fetchItems() {
    if (this.residents && this.residents.length > 0) {
      this.residents = await fetchItems(this.residents, getCharacterByName);
    }
    if (this.films && this.films.length > 0) {
      this.films = await fetchItems(this.films, getFilmByName);
    }
  }
}

class Starships {
  constructor(name, model, passengers, starship_class, films) {
    this.name = name;
    this.model = model;
    this.passengers = passengers;
    this.starship_class = starship_class;
    this.films = films;
  }

  async fetchItems() {
    if (this.passengers && this.passengers.length > 0) {
      this.passengers = await fetchItems(this.passengers, getCharacterByName);
    }
    if (this.films && this.films.length > 0) {
      this.films = await fetchItems(this.films, getFilmByName);
    }
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
    people
  ) {
    this.name = name;
    this.language = language;
    this.classification = classification;
    this.average_lifespan = average_lifespan;
    this.average_height = average_height;
    this.skin_colors = skin_colors;
    this.films = films;
    this.people = people;
  }

  async fetchItems() {
    if (this.films && this.films.length > 0) {
      this.films = await fetchItems(this.films, getFilmByName);
    }
    if (this.people && this.people.length > 0) {
      this.people = await fetchItems(this.people, getCharacterByName);
    }
  }
}

class Manager {
  constructor() {}
  init() {
  }
}
