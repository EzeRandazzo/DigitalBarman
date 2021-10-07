//Llamar funcion para pantalla cargando
window.onload = loading();

//Array
let listaTragos = [];

// objeto
class Trago{
    constructor(nombre, bebidaBase, cantidadBase, bebidaComp, cantidadComp, extra, hielo, shaker, desc,) {
        this.nombre = nombre;
        this.bebidaBase = bebidaBase;
        this.cantidadBase = cantidadBase;
        this.bebidaComp = bebidaComp;
        this.cantidadComp = cantidadComp;
        this.extra = extra;
        this.hielo = hielo;
        this.shaker = shaker;
        this.desc = desc;
    }
}

// Ciclo for
function hacerCicloTrago() {
  // Entrar info
  const  trago = new Trago (
    document.getElementById("nuevoTrago").elements[0].value,
    document.getElementById("nuevoTrago").elements[1].value,
    document.getElementById("nuevoTrago").elements[2].value,
    document.getElementById("nuevoTrago").elements[3].value,
    document.getElementById("nuevoTrago").elements[4].value,
    document.getElementById("nuevoTrago").elements[5].value,
    document.getElementById("nuevoTrago").elements[6].checked,
    document.getElementById("nuevoTrago").elements[7].checked,
    document.getElementById("nuevoTrago").elements[8].value,
    );
    
    //JSON y local storage del trago creado
    const tragoJSON = JSON.stringify(trago);
    localStorage.setItem(trago.nombre, tragoJSON);
    
    //Informar que se creo con exito el trago
    alert(`Trago ${trago.nombre} creado con EXITO`);
}

//Escuchar el Boton para imprimir los tragos
document.getElementById("verTragoBTN").addEventListener("click", verTragos);

function verTragos() {
  //Obtenemos el nodo donde vamos a agregar los nuevos elementos
  let padreVT = document.getElementById("tragosImprimir");
  while (padreVT.firstChild) {
    padreVT.removeChild(padreVT.firstChild);
  }
  let ls = top.localStorage,
  n = ls.length,
  i = 0,
  key, value;
 
  listaTragos = [];

  for (; i < n; i++) {
    key = ls.key(i);
    const value = ls.getItem(key);
    const propTrago = JSON.parse(value);
    //Agregar al array los tragos
    listaTragos.push(propTrago);
  }

  //Array Ordenado por .sort() Lo busque en stackoverflow porque no podia hacer que funcione
  listaTragos.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));

  e = 0;
  for (; e < listaTragos.length; e++) {
    const tragoCard = listaTragos[e];
    let card = document.createElement(`div`);
    // Consulta las propiedades del trago
    let hayTitulo = `<h3>${tragoCard.nombre}</h3>`;
    let hayDesc = (tragoCard.desc.length > 2) ? `<p>${tragoCard.desc}</p><hr>` : `<hr>`;
    let hayIng =   `<h4>Ingredientes:</h4>`;
    let hayBbase = (tragoCard.bebidaBase.length > 2) ? `<li> ${tragoCard.bebidaBase} ${tragoCard.cantidadBase} oz</li>` : ``;
    let hayBcomp = (tragoCard.bebidaComp.length > 2) ? `<li> ${tragoCard.bebidaComp} ${tragoCard.cantidadComp} oz</li>` : ``;
    let hayHielo = (tragoCard.hielo == true) ? `<li>Agregar hielo a gusto</li>` : ``;
    let hayShaker = (tragoCard.shaker == true) ? `<li>Vertir todo en el Shaker o Coctelera y batir</li>` : ``;
    let hayExtra = (tragoCard.extra.length > 2) ? `<li>Agregar ${tragoCard.extra}</li>` : ``;
    let hayCierre = `<li>¡Listo! El trago ${tragoCard.nombre} </b> esta listo para servir y beber</li><br><br>`;
    //Suma las propiedades del Trago
    const ContenidoCard = hayTitulo+hayDesc+hayIng+hayBbase+hayBcomp+hayHielo+hayShaker+hayExtra+hayCierre;
    //Crea la Card
    card.className = `card col-6`;
    card.insertAdjacentHTML ('afterbegin', ContenidoCard);
    padreVT.appendChild(card);
  }
}

//Usando Ajax y API Mercado Libre para traer las bebidas
let eleccionBebidas = "bebidas";
let mostrar = "";
let datos = "";
let padreEB = document.getElementById("bebidasML");

function llamadoML() {
  let url = 'https://api.mercadolibre.com/sites/MLA/search?q='+eleccionBebidas;
  fetch(url, {
    headers: {
      'Authorization': 'Bearer $gPQ0LHRFfOFCksHC6vY6zmz7CyAgCmBw',
    }
  })
  .then(response => response.json())
  .then(data => {
    datos = data["results"];
    listaBebidas(datos);
    $("#cargandoBebidas").hide();
  })
  .catch(error => console.log(error))
  
  function listaBebidas(datos){
    datos.forEach(element => {
      mostrar += `<div><div class="card bebidas"><img alt="${element.id}" src="${element.thumbnail}"><br><br><p>${element.title}</p><p>$${element.price}</p><button class="btn btn-outline-secondary btn-sm">+ Agregar</button></div></div>`
    });
    padreEB.insertAdjacentHTML('afterbegin', mostrar);
  }
}
//Iniciando funcion para traer todas las bebidas de ML
window.onload = llamadoML();

//Usando Jquery para la botonera
function hideAll(){
  $("#crearTrago").hide();
 $("#cardRecetario").hide();
 }
function botonEsconder(value){
  hideAll();
  $("#"+value).fadeToggle();
}
function tipoBebida(value){
  eleccionBebidas = value;
  mostrar = "";
  $("#cargandoBebidas").show();
  while (padreEB.firstChild) {
    padreEB.removeChild(padreEB.firstChild);
  }
  llamadoML();
}

//Escuchar los botones para mover los productos
let pos = 0;
function bebIzq() {
  let posicion = --pos*600;
  padreEB.style.marginLeft = posicion+'px';
}
function bebDer() {
  let posicion = ++pos*600;
  padreEB.style.marginLeft = posicion+'px';
}