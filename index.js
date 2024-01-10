"use strict";
const img = document.getElementById("img");
const container = document.getElementById("container");
const button = document.getElementById("btn");
console.log(container);

const getPhoto = async () => {
  const result = await fetch("https://coffee.alexflipnote.dev/random.json");
  console.log(result);
  const data = await result.json();
  console.log(data);
  img.src = data.file;
  container.appendChild(img);
};

button.addEventListener("click", getPhoto);

img.style.height = "200px";
img.style.width = "200px";
