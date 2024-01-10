const container = document.querySelector(".container");
console.log(container);
container.style.display = "flex";
container.style.flexDirection = "column";

const button = document.createElement("button");
button.style.height = "30px";
button.style.width = "150px";
button.style.margin = "auto";
button.innerText = "click to see doggos";
container.append(button);
const img = document.createElement("img");
const getPhoto = async () => {
  const result = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await result.json();
  console.log(data);
  img.src = data.message;
  img.style.height = "500px";
  img.style.width = "500px";
  img.style.objectFit = "cover";
  img.style.margin = "auto";
  container.appendChild(img);
};
button.addEventListener("click", getPhoto);
