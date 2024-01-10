const inputButtonDiv = document.querySelector(".inputButton");
inputButtonDiv.style.display = "flex";
inputButtonDiv.style.justifyContent = "center";

const photoContainer = document.querySelector(".photos");
photoContainer.style.display = "flex";
photoContainer.style.flexWrap = "wrap";
photoContainer.style.gap = "5px";
photoContainer.style.justifyContent = "center";

const button = document.createElement("button");
button.innerText = "Search";
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Search for the author...";
inputButtonDiv.append(input, button);

const getPhotos = async () => {
  const result = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks/?limit=12`
  );
  console.log(result);
  const inform = await result.json();
  console.log(inform);

  inform.data.map((e) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.border = "1px solid black";
    const img = document.createElement("img");
    const author = document.createElement("h3");
    const title = document.createElement("h4");
    const year = document.createElement("h5");
    img.className = "img";
    img.src = e.images.web.url;
    img.alt = e.type;
    img.style.height = "250px";
    img.style.width = "250px";

    author.innerText = e.creators[0].description;
    title.innerText = e.title;
    year.innerText = e.creation_date;

    card.append(img, author, title, year);
    photoContainer.append(card);
  });
};
getPhotos();

const getQueryPhotos = async (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();
  console.log(inputValue);

  const result = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks/?artists=${inputValue}`
  );
  console.log(result);
  const inform = await result.json();
  //   console.log(data);
  if (inform.data.length === 0) {
    const infoElement = document.createElement("h2");
    infoElement.innerText = "Image not found";
    container.appendChild(infoElement);
  } else {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => card.remove());
  }
  inform.data.map((e) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.border = "1px solid black";
    const img = document.createElement("img");
    const author = document.createElement("h3");
    const title = document.createElement("h4");
    const year = document.createElement("h5");
    img.className = "img";
    img.src = e.images.web.url;
    img.alt = e.type;
    img.style.height = "250px";
    img.style.width = "250px";

    author.innerText = e.creators[0].description;
    title.innerText = e.title;
    year.innerText = e.creation_date;

    card.append(img, author, title, year);
    photoContainer.append(card);
  });
};
button.addEventListener("click", getQueryPhotos);
