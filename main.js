// --- Selectors ---
const titleInput = document.querySelector("#title-input");
const directorInput = document.querySelector("#director-input");
const yearInput = document.querySelector("#year-input");
const genreInput = document.querySelector("#genre-input");
const durationInput = document.querySelector("#duration-input");
const ratingInput = document.querySelector("#rating-input");
const addMovieBtn = document.querySelector("#add-movie-btn");

// --- Event listeners ---
addMovieBtn.addEventListener("click", addMovie);

// --- GET ---
const fetchData = async () => {
  try {
    const response = await fetch("https://localhost:7063/api/Movies");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const createCardElement = (tag, textContent) => {
  const element = document.createElement(tag);
  element.textContent = textContent;
  return element;
};

const displayMovies = (movies) => {
  const movieContainer = document.getElementById("movieContainer");

  movies.forEach((movie) => {
    const movieCard = createCardElement("div", "");
    const ulElement = createCardElement("ul");
    movieCard.classList.add("movie-card");

    const listElements = [
      createCardElement("li", `Directed by: ${movie.director}`),
      createCardElement("li", `Year: ${movie.year}`),
      createCardElement("li", `Genre: ${movie.genre}`),
      createCardElement("li", `Duration: ${movie.duration}`),
      createCardElement("li", `Rating: ${movie.rating}`),
    ];

    listElements.forEach((element) => ulElement.appendChild(element));

    movieCard.appendChild(createCardElement("h3", movie.title));
    movieCard.appendChild(ulElement);

    movieContainer.appendChild(movieCard);
  });
};
fetchAndDisplay();

function fetchAndDisplay() {
  fetchData().then((movies) => {
    clearMovieContainer();
    displayMovies(movies);
  });
}

function clearMovieContainer() {
  const movieContainer = document.getElementById("movieContainer");
  while (movieContainer.firstChild) {
    movieContainer.removeChild(movieContainer.firstChild);
  }
}

//  --- POST ---
function addMovie() {
  const title = titleInput.value;
  const director = directorInput.value;
  const year = yearInput.value ? parseInt(yearInput.value) : 0;
  const genre = genreInput.value;
  const duration = durationInput.value ? parseInt(durationInput.value) : 0;
  const rating = ratingInput.value ? parseFloat(ratingInput.value) : 0;

  let newMovie;
  if (isNaN(year) || isNaN(duration) || isNaN(rating)) {
    alert("Year, duration och rating måste vara nummer eller inget");
    console.log(year, duration, rating);
    return;
  } else {
    newMovie = {
      title: title,
      director: director,
      year: year,
      genre: genre,
      duration: duration,
      rating: rating,
    };
  }

  fetch("https://localhost:7063/api/Movies/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  }).then((response) => {
    if (response.ok) {
      alert(`The movie ${newMovie.title} has been added to the database.`);
      document.getElementById("add-movie-form").reset();
      fetchAndDisplay();
      return;
    }
    return response.text().then((t) => displayErrors(JSON.parse(t)));
  });
}

// Tänkte fixat detta för alla poster men det blev för stort.
// Borde implementerat en riktig try catch med för att handskas
// med fel men lever hellre i tron att min kod är felfri :P

function displayErrors(t) {
  alert(t.errors.Title);
}
