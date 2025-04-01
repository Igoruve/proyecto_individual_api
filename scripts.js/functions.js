function toggleNav() {
  let nav = document.querySelector(".menu__burger-links");
  console.log(nav);
  nav.classList.toggle("active");
}

function displayInfo(info) {
  const resultSection = document.getElementById("browser__results");
  resultSection.innerHTML = "";
  const volumeInfo = book.volumeInfo;
  const bookId = book.id;
  const bookCard = new BookHTML(
    bookId,
    volumeInfo.title,
    volumeInfo.publishedDate,
    volumeInfo.pageCount,
    volumeInfo.language,
    volumeInfo.categories,
    volumeInfo.description,
    volumeInfo.imageLinks,
    volumeInfo.authors,
    volumeInfo.infoLink
  );
  if (!volumeInfo.imageLinks) {
    return;
  } else {
    bookCard.initialize(resultSection);
  }
}
