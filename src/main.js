import {
  getBooks,
  getCharacters,
  searchCharacterByName,
  getSpells,
  searchSpellsByLetter,
  charactersOrder
} from './data.js';

// import data from './data/lol/lol.js';
//import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';
import data from "./data/harrypotter/data.js";

const showModalBooks = (title, description, author, releaseDay) => {
  const modalContainer = document.getElementById("modalContainer");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalAuthor = document.getElementById("modalAuthor");
  const modalReleaseDay = document.getElementById("modalReleaseDay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  modalTitle.innerText = title;
  modalDescription.innerText = description;
  modalAuthor.innerText = author;
  modalReleaseDay.innerText = releaseDay;
  modalContainer.style.display = "flex"

  modalCloseBtn.addEventListener("click", function () {
    modalContainer.style.display = "none";
  })
}

const showBooks = () => {
  const books = getBooks(data);
  const booksContainer = document.getElementById("booksContainer");

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const section = document.createElement("section");
    const bookTitle = document.createElement("h3");
    const bookIcon = document.createElement("img");

    bookIcon.src = "../imagenes/book-icon.png";
    bookIcon.width = 64;
    bookIcon.height = 64;
    section.className = "card-book";
    bookTitle.innerText = book.title;
    bookTitle.className = "titulo";

    booksContainer.appendChild(section);
    section.appendChild(bookIcon)
    section.appendChild(bookTitle);

    section.addEventListener("click", function () {
      showModalBooks(book.title, book.description, book.author, book.releaseDay);
    })
  }
}

if (location.pathname === '/pages/books' || location.pathname === '/DEV003-data-lovers/pages/books.html') {
  showBooks()
}

const showModalCharacters = (name, birth, death, species, ancestry, gender, house) => {
  const modalContainer = document.getElementById("modalContainer");
  const modalName = document.getElementById("modalName");
  const modalBirth = document.getElementById("modalBirth");
  const modalDeath = document.getElementById("modalDeath");
  const modalSpecies = document.getElementById("modalSpecies");
  const modalAncestry = document.getElementById("modalAncestry");
  const modalGender = document.getElementById("modalGender");
  const modalHouse = document.getElementById("modalHouse");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  modalName.innerText = name;
  modalBirth.innerText = birth;
  modalDeath.innerText = death;
  modalSpecies.innerText = species;
  modalAncestry.innerText = ancestry;
  modalGender.innerText = gender;
  modalHouse.innerText = house;
  modalContainer.style.display = "flex"

  modalCloseBtn.addEventListener("click", function () {
    modalContainer.style.display = "none";
  })
}

const showCharacters = () => {
  const characters = getCharacters(data);
  const orderAZBtn = document.getElementById('orderAZBtn');
  const orderZABtn = document.getElementById('orderZABtn');
  const charactersContainer = document.getElementById("charactersContainer");
  const form = document.getElementById("charactersSearchForm");
  const searchBtn = document.getElementById("searchBtn");
  let sortOrder = 'A-Z';

  orderAZBtn.addEventListener('click', function () {
    sortOrder = 'A-Z';
    searchBtn.click();
  });

  orderZABtn.addEventListener('click', function () {
    sortOrder = 'Z-A';
    searchBtn.click();
  })

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    charactersContainer.innerHTML = "";
    const searchVal = form.querySelector('.search').value;
    const charactersFound = searchCharacterByName(searchVal, characters);

    if (charactersFound.length > 0) {
      const sortedCharacters = charactersOrder(charactersFound, sortOrder);

      if (sortOrder === 'A-Z') {
        orderAZBtn.disabled = true;
        orderZABtn.disabled = false;
      } else if (sortOrder === 'Z-A') {
        orderAZBtn.disabled = false;
        orderZABtn.disabled = true;
      }

      sortedCharacters.forEach(function (character) {
        const nameEl = document.createElement('h3');
        nameEl.className = "character-name";
        nameEl.innerText = character.name;
        charactersContainer.appendChild(nameEl);
        nameEl.addEventListener("click", function () {
          showModalCharacters(
            character.name, character.birth, character.death,
            character.species, character.ancestry, character.gender, character.house
          );
        });
      });
    } else {
      const notFoundEl = document.createElement('h3');
      notFoundEl.className = "character-name";
      notFoundEl.innerText = "We have not found any character with: " + '"' + searchVal + '"';
      charactersContainer.appendChild(notFoundEl);
      orderAZBtn.disabled = true;
      orderZABtn.disabled = true;
    }
  })
}

// function carrusel
const carousel = () => {
  let slidePosition = 0;
  const slides = document.getElementsByClassName('carousel__item');
  const totalSlides = slides.length;

  document.
    getElementById('carousel__button--next')
    .addEventListener("click", function () {
      moveToNextSlide();
    });
  document.
    getElementById('carousel__button--prev')
    .addEventListener("click", function () {
      moveToPrevSlide();
    });

  function updateSlidePosition() {
    for (const slide of slides) {
      slide.classList.remove('carousel__item--visible');
      slide.classList.add('carousel__item--hidden');
    }

    slides[slidePosition].classList.add('carousel__item--visible');
  }

  function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
      slidePosition = 0;
    } else {
      slidePosition++;
    }

    updateSlidePosition();
  }

  function moveToPrevSlide() {
    if (slidePosition === 0) {
      slidePosition = totalSlides - 1;
    } else {
      slidePosition--;
    }

    updateSlidePosition();
  }
}

if (location.pathname === '/pages/characters' || location.pathname === '/DEV003-data-lovers/pages/characters.html') {
  showCharacters()
  carousel()
}


const showSpellsLetters = () => {
  const letters = document.getElementById("lettersContainer");
  const spellLetters = letters.children;
  for (let i = 0; i < spellLetters.length; i++) {
    const letter = spellLetters[i];
    letter.addEventListener("click", function () {
      window.location = document.URL + '?search=' + letter.id;
    });
  }
}

const showSpellsByLetter = (filteredSpells) => {
  const spellsContainer = document.getElementById("spellsContainer");
  for (let i = 0; i < filteredSpells.length; i++) {
    const spell = filteredSpells[i];
    const spellName = document.createElement("h2");
    const spellsInformation = document.createElement("div");
    spellName.innerText = spell.name;
    if (spell.pronunciation !== null) {
      spellsInformation.innerHTML = "<p>🧙‍♂️Pronunciation: " + spell.pronunciation + '</p>';
    }
    if (spell.description !== null) {
      spellsInformation.innerHTML += "<p>🌠Description: " + spell.description + '</p>';
    }
    if (spell.mention !== null) {
      spellsInformation.innerHTML += "<p>🔤Mention: " + spell.mention + '</p>';
    }
    spellName.className = "spell-name";
    spellsInformation.className = "spell-style";
    spellsContainer.appendChild(spellName);
    spellsContainer.appendChild(spellsInformation);
  }
}

const spellsNotFound = (searchParam) => {
  const spellNotFound = document.getElementById("spellsNotFound");
  spellNotFound.innerText = "Spells not found with letter: " + searchParam.toUpperCase();
  spellNotFound.style.display = "block";
}


const handleSpells = (searchParam) => {
  const spells = getSpells(data);
  const filteredSpells = searchSpellsByLetter(searchParam, spells)
  if (filteredSpells.length === 0) {
    spellsNotFound(searchParam);
  } else {
    showSpellsByLetter(filteredSpells);
  }
}

if (location.pathname === '/pages/spells' || location.pathname === '/DEV003-data-lovers/pages/spells.html') {
  const letters = document.getElementById("lettersContainer");
  const params = (new URL(document.location)).searchParams;
  const searchParam = params.get('search');


  if (searchParam) {
    letters.style.display = "none";
    handleSpells(searchParam)
  } else {
    showSpellsLetters()
  }
}
