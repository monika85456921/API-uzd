const API = "e458f679";
const container = document.getElementById("container");

const button = document.createElement("button");
button.innerText = "Find a movie";

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Bee movie";

container.append(input, button);

const getMovie = async (e) => {
  e.preventDefault();

  const inputValue = input.value.trim();
  const result = await fetch(
    `http://www.omdbapi.com/?apikey=${API}&s=${inputValue}`
  );
  const data = await result.json();
  console.log(data);
  const movieNotFound = document.querySelector(".movieNotFound");
  if (movieNotFound) {
    movieNotFound.remove();
  }

  if (data.Response === "False") {
    const movieNotFound = document.createElement("h3");
    movieNotFound.innerText = "Movie not Found";
    movieNotFound.className = "movieNotFound";
    container.appendChild(movieNotFound);
  } else {
    const allMovieCards = document.querySelectorAll(".card");
    allMovieCards.forEach((movie) => movie.remove());
    data.Search.map((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className = "card";
      movieCard.style.display = "flex";

      const moviePoster = document.createElement("img");
      moviePoster.src = movie.Poster;
      moviePoster.alt = movie.Title;

      const movieInfo = document.createElement("div");
      movieInfo.className = "MovieInfo";
      const title = document.createElement("h2");
      title.innerText = "Title:" + movie.Title;
      const year = document.createElement("h3");
      year.innerText = "Year:" + movie.Year;

      movieCard.append(moviePoster, movieInfo);
      movieInfo.append(title, year);
      container.appendChild(movieCard);
    });
  }
};
button.addEventListener("click", getMovie);
