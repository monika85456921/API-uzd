const API = "w6gsa2oVvYjdKsRuveSBxULHQKfp6ytW3p6kX8x3Aho";
const container = document.getElementById("container");
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(3, 1fr)";
const button = document.createElement("button");
button.innerText = "Photos";

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Get photos";

container.append(input, button);

const getPhotos = async () => {
  const result = await fetch(
    `https://api.unsplash.com/photos/random/?client_id=${API}&count=10`
  );
  console.log(result);
  const data = await result.json();
  console.log(data);
  data.map((e) => {
    const images = document.createElement("img");
    images.src = e.urls.small;
    images.alt = e.alt_description;
    images.className = "images";
    container.appendChild(images);
    images.style.height = "200px";
    images.style.width = "200px";
  });
};
getPhotos();

const getQueryPhotos = async (event) => {
  event.preventDefault;
  const inputValue = input.value.trim();
  console.log(inputValue);

  const result = await fetch(
    `https://api.unsplash.com/search/photos?client_id=w6gsa2oVvYjdKsRuveSBxULHQKfp6ytW3p6kX8x3Aho&query=${inputValue}&per_page=6`
  );
  let data = await result.json();
  console.log(data);

  if (data.results.length === 0) {
    const infoElement = document.createElement("h2");
    infoElement.innerText = "Image not found";
    container.appendChild(infoElement);
  } else {
    const allImages = document.querySelectorAll(".images");
    allImages.forEach((img) => img.remove());
    console.log(data);

    data.results.map((img) => {
      const photo = document.createElement("img");
      photo.src = img.urls.small;
      photo.alt = img.alt_description;
      photo.style.height = "200px";
      photo.style.width = "200px";
      container.appendChild(photo);
      photo.className = "images";
    });
  }
};
button.addEventListener("click", getQueryPhotos);
