// --- Selectors ---

const titleInput = document.querySelector("#title-input");
const directorInput = document.querySelector("#director-input");
const yearInput = parseInt(document.querySelector("#year-input"));
const genreInput = document.querySelector("#genre-input");
const durationInput = parseInt(document.querySelector("#duration-input"));
const ratingInput = parseFloat(document.querySelector("#rating-input"));
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
    movieCard.classList.add("movie-card");

    const elementsToAdd = [
      createCardElement("h3", movie.title),
      createCardElement("li", `Directed by: ${movie.director}`),
      createCardElement("li", `Year: ${movie.year}`),
      createCardElement("li", `Genre: ${movie.genre}`),
      createCardElement("li", `Duration: ${movie.duration}`),
      createCardElement("li", `Rating: ${movie.rating}`),
    ];

    elementsToAdd.forEach((element) => movieCard.appendChild(element));
    movieContainer.appendChild(movieCard);
  });
};

fetchData().then((movies) => {
  displayMovies(movies);
});

//  --- POST ---

function addMovie() {
  const title = titleInput.value;
  const director = directorInput.value;
  const year = yearInput.valueOf;
  const genre = genreInput.value;
  const duration = durationInput.valueOf;
  const rating = ratingInput.valueOf;

  let newMovie;
  // TODO: Check for empty string
  if (!title || isNaN(year) || isNaN(duration) || isNaN(rating)) {
    newMovie = {
      title: title,
      director: director,
      year: year,
      genre: genre,
      duration: duration,
      rating: rating,
    };
  }
  console.log(newMovie);
  fetch("https://localhost:7063/api/Movies/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  })
    .then((response) => {
      // Handle the response, check if it was successful, etc.
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json;
    })
    .then((text) => {
      // Do something with the data if needed
      console.log(text);
    });

  document.getElementById("add-movie-form").reset();
}
