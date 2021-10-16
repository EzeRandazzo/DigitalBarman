//Llamar funcion para pantalla cargando
window.onload = loading();

//Array
let listaTragos = [];

// objeto
class Trago{
    constructor(nombreTrago, bebidasTrago, bebidaCategoria, imagenTrago, extra, desc, hielo, shaker, colorTrago, copaTrago) {
        this.nombreTrago = nombreTrago;
        this.bebidasTrago = bebidasTrago;
        this.bebidaCategoria = bebidaCategoria;
        this.imagenTrago = imagenTrago;
        this.extra = extra;
        this.desc = desc;
        this.hielo = hielo;
        this.shaker = shaker;
        this.colorTrago = colorTrago;
        this.copaTrago = copaTrago;
    }
}

// Ciclo for
function hacerCicloTrago() {
  // Entrar info
  const  trago = new Trago (
    document.getElementById("nuevoTragoTitulo").elements[0].value,
    document.getElementById("bebidasTragoInfo").innerHTML,
    document.getElementById("categoriaBebida").innerHTML,
    document.getElementById("nuevoTrago").elements[0].value,
    document.getElementById("nuevoTrago").elements[1].value,
    document.getElementById("nuevoTrago").elements[2].value,
    document.getElementById("nuevoTrago").elements[3].checked,
    document.getElementById("nuevoTrago").elements[4].checked,
    document.getElementById("nuevoTrago").elements[5].value,
    document.getElementById("copa").src,
    );
    
    //JSON y local storage del trago creado
    const tragoJSON = JSON.stringify(trago);
    localStorage.setItem(trago.nombreTrago, tragoJSON);
    
    //Informar que se creo con exito el trago
    document.getElementById("tituloAlerta").insertAdjacentHTML("afterbegin", `Felicitaciones`);
    document.getElementById("parrafoAlerta").insertAdjacentHTML("afterbegin", `¡Trago <strong>${trago.nombreTrago}<strong> creado con exito!`);
    $("#alertas").fadeToggle();
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
  listaTragos.sort((a,b) => (a.nombreTrago > b.nombreTrago) ? 1 : ((b.nombreTrago > a.nombreTrago) ? -1 : 0));

  e = 0;
  for (; e < listaTragos.length; e++) {
    const tragoCard = listaTragos[e];
    let card = document.createElement(`div`);
    // Consulta las propiedades del trago
    let hayTitulo = `<h3 style="text-transform: uppercase;">${tragoCard.nombreTrago}</h3>`;
    let hayDesc = (tragoCard.desc.length > 2) ? `<p>${tragoCard.desc}</p><hr><br>` : `<hr><br>`;
    let hayImg = `<div class="headerTrago" style="background: url(${tragoCard.imagenTrago})"></div>`;
    let hayIngredientes =   `<div style="display: flex">
                              <div class="ingredientes"><br><h4 style="text-align: left;">Ingredientes:</h4>`;
    let hayBebidas = `${tragoCard.bebidasTrago}`;
    let hayHielo = (tragoCard.hielo == true) ? `<li>Agregar hielo a gusto</li>` : ``;
    let hieloSRC = (tragoCard.hielo == true) ? `hielo` : `vacio`;
    let hayShaker = (tragoCard.shaker == true) ? `<li>Vertir todo en el Shaker o Coctelera y batir</li>` : ``;
    let hayExtra = (tragoCard.extra.length > 2) ? `<li>Agregar ${tragoCard.extra}</li>` : ``;
    let hayCierre = `<li>¡Listo! El trago ${tragoCard.nombreTrago} </b> esta listo para servir y beber</li></div>`;
    let hayCopa = `<div style="width: 49%; height: 100%; top: 0px; position: relative; background:${tragoCard.colorTrago};">
                  <img style="width: 100%; top: 0px; position: absolute;" src="${tragoCard.copaTrago}">
                  <img style="width: 100%; top: 0px;" src="/img/${hieloSRC}.png">
                  </div></div>`;
    let botonera = `<br>
                    <p>Categorias: ${tragoCard.bebidaCategoria}</p>
                    <hr><br>
                    <button class="btn btn-outline-secondary btn-sm" style="margin: 10px !important;" value="${tragoCard.nombreTrago}" onclick="borrarTrago(this.value)">
                       <i class="lar la-trash-alt"></i>
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" style="margin: 10px !important;" >
                       EDITAR <i class="las la-pen"></i>
                    </button>`;
    //Suma las propiedades del Trago
    const ContenidoCard = hayTitulo+hayDesc+hayImg+hayIngredientes+hayBebidas+hayHielo+hayShaker+hayExtra+hayCierre+hayCopa+botonera;
    //Crea la Card
    card.className = `card col-md-6`;
    card.id = `${tragoCard.nombreTrago}card`;
    card.insertAdjacentHTML ("afterbegin", ContenidoCard);
    padreVT.appendChild(card);
  }
}

//Usando Ajax y API Mercado Libre para traer las bebidas
let eleccionBebidas = "bebidas";
let mostrar = "";
let datos = "";
let padreEB = document.getElementById("bebidasML");

function llamadoML() {
  let url = "https://api.mercadolibre.com/sites/MLA/search?q="+eleccionBebidas;
  fetch(url, {
    headers: {
      "Authorization": "Bearer $gPQ0LHRFfOFCksHC6vY6zmz7CyAgCmBw",
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
      mostrar += `<div>
       <div class="card bebidas" id="${element.id}">
         <img alt="${element.title}" src="${element.thumbnail}">
         <br><br>
         <p><strong>${element.title}</strong></p>
         <p>$${element.price}</p>
         <button class="btn btn-outline-secondary btn-sm" onclick="agregarBebida(this.value)" value="${element.id}">
           + Agregar
         </button>
       </div>
      </div>`
    });
    padreEB.insertAdjacentHTML("afterbegin", mostrar);
  }
}
//Iniciando funcion para traer todas las bebidas de ML
window.onload = llamadoML();

//Usando Jquery para la botonera
function esconder(value){
  $("#"+value).fadeToggle();
}
function esconderTodo(){
  $("#crearTrago").hide();
  $("#cardRecetario").hide();
 }
function botonMostrar(value){
  esconderTodo();
  $("#"+value).fadeToggle();
}

//Escuchar la categoria de bebidas a mostrar
function tipoBebida(value){
  eleccionBebidas = value;
  mostrar = "";
  $("#cargandoBebidas").show();
  while (padreEB.firstChild) {
    padreEB.removeChild(padreEB.firstChild);
  }
  llamadoML();
}

//Escuchar el tipo de vaso Contenedor a mostrar
function tipoContenedor(value){
  document.getElementById("copa").src = value;
}

//Escuchar input hielo para mostrar imagen
function hieloFunc()
{
  if (document.getElementById("hieloCheck").checked) 
  {
    document.getElementById("hieloIMG").src = "/img/hielo.png";
  } else {
    document.getElementById("hieloIMG").src = "/img/vacio.png";
  }
}

//Escuchar los botones para mover los productos
let pos = 0;
function bebIzq() {
  let posicion = --pos*600;
  padreEB.style.marginLeft = posicion+"px";
}
function bebDer() {
  let posicion = ++pos*600;
  padreEB.style.marginLeft = posicion+"px";
}

//Agregar bebida al trago
let idBebidaElegida = "";
let cardBebidaElegida = "";
let cardBebidaElegidaJSON = "";
let cardBebidaCategoriaJSON = "";
let datosBeb = "";
let padreTragoB = document.getElementById("bebidasTrago");
let padreTragoB2 = document.getElementById("bebidasTragoInfo");
let padreTragoB3 = document.getElementById("categoriaBebida");


function agregarAlTrago() {
  let url = "https://api.mercadolibre.com/items/"+idBebidaElegida;
  fetch(url, {
    headers: {
      "Authorization": "Bearer $gPQ0LHRFfOFCksHC6vY6zmz7CyAgCmBw",
    }
  })
  .then(response => response.json())
  .then(data => {
    datosBeb = data;
    bebidaParaTrago(datosBeb);
    bebidaParaTragoJSON(datosBeb);
  })
  .catch(error => console.log(error))
  
  function bebidaParaTrago(datosBeb){
    cardBebidaElegida += `<div>
       <div class="card bebidaAgregada" id="${datosBeb.id}card">
         <button class="btn btn-outline-secondary btn-sm" style="margin: 10px !important;" onclick="borrarCard(this.value)" value="${datosBeb.id}">
         <i class="lar la-trash-alt"></i>
         </button>
         <img alt="${datosBeb.title}" src="${datosBeb.thumbnail}">
         <p><strong>${datosBeb.title}</strong></p>
         <p style="width: auto; top: 41px;">$${datosBeb.price}</p>
       </div>
      </div>` ;
    padreTragoB.insertAdjacentHTML("afterbegin", cardBebidaElegida);
    cardBebidaElegida = "";
  }
  function bebidaParaTragoJSON(datosBeb){
    cardBebidaElegidaJSON += `<li id="${datosBeb.id}hiden">${datosBeb.title}</li>`;
    cardBebidaCategoriaJSON += `<li id="${datosBeb.id}categoria">${eleccionBebidas}</li>`;
    padreTragoB2.insertAdjacentHTML("afterbegin", cardBebidaElegidaJSON);
    padreTragoB3.insertAdjacentHTML("afterbegin", cardBebidaCategoriaJSON);
    cardBebidaElegidaJSON = "";
    cardBebidaCategoriaJSON = " ";
    datosBeb = "";
  }
}

//Escuchar boton + Agregar bebida al trago
function agregarBebida(value){
  idBebidaElegida = value;
  agregarAlTrago();
}

//Escuchar boton eliminar bebida del trago
function borrarCard(value) {
  document.getElementById(value+"card").remove();
  document.getElementById(value+"hiden").remove();
  document.getElementById(value+"categoria").remove();
}

//Escuchar boton eliminar trago de la biblioteca
function borrarTrago(value) {
  document.getElementById(value+"card").remove();
  localStorage.removeItem(value);
}

//Cambiar color bebida
let colorTrago = document.getElementById("colorTrago");
let liquido = document.getElementById("copaDiv");
colorTrago.addEventListener("change", function(){
   liquido.style.backgroundColor = this.value; 
})
