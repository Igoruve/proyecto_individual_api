import { Manager } from "./classes.js";

function saveToLocalStorage (toberead, book) {
    const stringBook = JSON.stringify(book);
	localStorage.setItem(toberead, stringBook);
}

function addToLocalStorageArray (fav, info) {
    const array = getFromLocalStorage(fav) || [];
    const index = array.findIndex(element => element.id === info.id);
    if (index !== -1) {
        return;
    }
    array.push(info);
    saveToLocalStorage(fav, array);
}

// Recuperar todos los objetos guardados en el LocalStorage
function getFromLocalStorage (fav) {
	const resultString = localStorage.getItem(fav);
	const resultJSON = JSON.parse(resultString);
	const result = [];
	if(resultJSON !== null) {
		resultJSON.forEach(info => { //crear un array de libros con el formato bookhtml
			const infoCard = new BookHTML (
				book.id,
				book.title,
				book.publishedDate,
				book.pageCount,
				book.language,
				book.categories,
				book.description,
				book.imageLinks,
				book.authors,
				book.infoLink
			)
			result.push(infoCard);
		});	
	}
	
	return result;
}


// Eliminar libros del array guardado en LocalStorage
function removeFromLocalStorageArray (fav, info) {
	const array = getFromLocalStorage(fav);
	if (!array) {
		return;
	}
	const index = array.findIndex(element => element.id === info.id);
	if (index === -1) {
		return;
	}
	array.splice(index, 1);
	saveToLocalStorage(fav, array);
}

// Buscar libros en lo guardado
function findInLocalStorageArray (fav, info) {
	const array = getFromLocalStorage(fav) || [];
	return array.find(element => element.id === info.id);
}

// Función para guardar el formulario en local storage
function formToLocalStorage () {
	const formulario = document.getElementById("contact__form");
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();
	});
	// Obtener los valores del formulario
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;

	 // Crear un objeto con los datos
	 let datos = {
        nombre: nombre,
        email: email
    };

	// Guardar en localStorage (convertimos el objeto a string JSON)
    localStorage.setItem("formularioDatos", JSON.stringify(datos));

    alert("Datos guardados en localStorage.");
}


export {
	saveToLocalStorage,
	getFromLocalStorage,
	addToLocalStorageArray,
	removeFromLocalStorageArray,
	findInLocalStorageArray,
	formToLocalStorage
}