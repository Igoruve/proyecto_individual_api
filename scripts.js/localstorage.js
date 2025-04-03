import { Manager } from "./classes.js";

function saveToLocalStorage(toberead, book) {
  const stringBook = JSON.stringify(book);
  localStorage.setItem(toberead, stringBook);
}

function addToLocalStorageArray(fav, info) {
	console.log("Intenta añadir");
  const array = getFromLocalStorage(fav) || [];
  const index = array.findIndex((element) => element.id === info.id);
  if (index !== -1) {
    return;
  }
  array.push(info);
  saveToLocalStorage(fav, array);
}

function getFromLocalStorage(fav) {
  const resultString = localStorage.getItem(fav);
  const resultJSON = JSON.parse(resultString);
  const result = [];
  if (resultJSON !== null) {
    resultJSON.forEach((info) => {
      result.push(info);
    });
  }

  return result;
}

function removeFromLocalStorageArray(fav, info) {
  const array = getFromLocalStorage(fav);
  if (!array) {
    return;
  }
  const index = array.findIndex((element) => element.id === info.id);
  if (index === -1) {
    return;
  }

  array.splice(index, 1);
  saveToLocalStorage(fav, array);
}

function findInLocalStorageArray(fav, info) {
  const array = getFromLocalStorage(fav) || [];
  return array.find((element) => element.id === info.id);
}

function formToLocalStorage() {
  const formulario = document.getElementById("contact__form");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let datos = {
    nombre: nombre,
    email: email,
  };

  localStorage.setItem("formularioDatos", JSON.stringify(datos));

  alert("Datos guardados en localStorage.");
}

export {
  saveToLocalStorage,
  getFromLocalStorage,
  addToLocalStorageArray,
  removeFromLocalStorageArray,
  findInLocalStorageArray,
  formToLocalStorage,
};
