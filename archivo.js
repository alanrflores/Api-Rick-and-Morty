//Muy importante: Cuando queremos solicitar informacion, en este caso de una API
//siempre tenemos que esperar que se cargue nuestro DOM.
document.addEventListener("DOMContentLoaded", () => {
//fetchData se va a ejecutar siempre y cuando termine de cargar nuestro DOM.
//Si todavia no esta cargado es imposible capturar la informacion.
 fetchData();
});

//Solicitud a nuestra API.
//Cuando trabajamos con el async y el await usamos,
//Try y Catch para manejar los errores.
const fetchData = async () => {
//Intenta hacer esto
try {
 loadindData();
//solicitud a nuestra API
//Como es una promesa que viene a la respuesta usamos await 
//Siempre en el fetch() van 2 await si no en el res.json() me va a decir promesa pendiente.
//Await para para traer primero la respuesta, y una vez que la tenga, la transforma en JSON.
const res = await fetch("https://rickandmortyapi.com/api/character");
//transformamos res a json
const data = await res.json(); 


pintarCard(data);
//En caso que falle que salga el error
} catch (error) {
 console.log(error);
//Finally independiente tanto salga bien o mal se va a ejecutar igual
} finally {
 //loadindData(false);
 }
};

const pintarCard = data =>{
//Aca vamos a pintar nuestras tarjetas
const cards = document.getElementById("card-dinamicas");
const templateCard = document.getElementById("template-card").content;
//Utilizo un fragment para evitar el reflow, si puedo utilizar innerHTML pero no es una buena practica.
//Porque estarias haciendo que tu sitio web se renderizara a cada momento
//El fragment lo guarda aparte del DOM, guardamos todos los elementos que pueden ser 100 0 1000 o mas
//Los guarda aparte y una vez que tiene todos esos element, los pinta en su sitio wb y ahi recien se renderiza.
const fragment = document.createDocumentFragment();
    //console.log(data)
 data.results.forEach(item => {
//console.log(item)
//REGLA DE ORO: Cuando trabajamos con TEMPLATE utilizando el .content es CLONARLO(clone);
const clone = templateCard.cloneNode(true);
//Una vez que tenemos el clone podemos acceder a cada uno de los elementos adentro del template.
clone.querySelector('h4').textContent = item.name;
clone.querySelector('p').textContent = item.species;
clone.querySelector('.card-img-top').setAttribute('src', item.image);
clone.querySelector('h5').textContent = item.location.name;


fragment.appendChild(clone);

  });
//Una vez que el fragment tiene sus elementos se los agrega a cards. 
cards.appendChild(fragment);
};
//Pintar el loading
const loadindData = (estado) => {
//lo capturo
const loading = document.getElementById("loading");
//sacamos la clase mencionada
 if(estado){
   loading.classList.remove("d-none");
  } else {
//Y si no la agregamos
   loading.classList.add("d-none");
 }
};
