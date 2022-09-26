const contenedor = document.getElementById("contenedor");
const botones = document.querySelectorAll("button");
let btnPrevius, btnNext, next, prev;
let page = 1;
let reemplazo = page;
let url = "https://rickandmortyapi.com/api/character/?page=" + page;

async function fetchData(url) {
  try {
    limpiarContenedoresCaracteres();
    const response = await fetch(url);
    const data = await response.json();
    const { info, results } = data;
    next = info.next;
    previus = info.prev;
    ocultarMostrarBotones(next, previus, results);
  } catch (err) {
    console.log(err.message);
  }
}

function ocultarMostrarBotones(next, previus, results) {
  botones.forEach((element) => {
    if (element.id === "btnPrevius") btnPrevius = element;
    else if (element.id === "btnNext") btnNext = element;
  });

  if (next === null) {
    btnNext.style.display = "none";
  } else if (previus === null) {
    btnPrevius.style.display = "none";
  }

  if (next !== null && previus !== null) {
    btnNext.style.display = "block";
    btnPrevius.style.display = "block";
  }
  mostrarData(results);
}

function mostrarData(results) {
  for (let index = 0; index < results.length; index++) {
    crearContenedorCaracter(results, index);
  }
}

function crearContenedorCaracter(results, index) {
  const divContenedorCaracter = document.createElement("div");
  divContenedorCaracter.id = "divContenedorCaracter";
  divContenedorCaracter.classList.add("divContenedorCaracter");
  const imagenCaracter = document.createElement("img");
  imagenCaracter.classList.add("imagenCaracter");
  imagenCaracter.src = results[index].image;
  const parrafoNombre = document.createElement("p");
  parrafoNombre.classList.add("parrafoNombre");
  parrafoNombre.textContent = results[index].name;
  const parrafoStatus = document.createElement("p");
  parrafoStatus.classList.add("parrafoStatus");
  parrafoStatus.textContent = "Status: " + results[index].status;
  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = "Location: " + results[index].location.name;
  divContenedorCaracter.appendChild(imagenCaracter);
  divContenedorCaracter.appendChild(parrafoNombre);
  divContenedorCaracter.appendChild(parrafoStatus);
  divContenedorCaracter.appendChild(location);
  contenedor.appendChild(divContenedorCaracter);
}

function realizarPeticionFetch(boton) {
  if (boton.target.id === "btnNext") {
    page++;
  } else if (boton.target.id === "btnPrevius") {
    page--;
  }
  url = url.replace(url.split("page=")[1], page);
  fetchData(url);
}

function limpiarContenedoresCaracteres() {
  let contenedoresCaracteres = document.getElementsByClassName(
    "divContenedorCaracter"
  );
  for (let index = contenedoresCaracteres.length; index >= 0; index--) {
    if (contenedoresCaracteres[index]) {
      contenedoresCaracteres[index].remove();
    }
  }
}

botones.forEach((element) => {
  element.addEventListener("click", realizarPeticionFetch);
});

fetchData(url);
