//Array
const listaTragos = [];

//Reiniciar el ciclo
var HacerOtro = "";

// objeto
class Trago{
    constructor(nombre, bebidaBase, cantidadBase, bebidaComp, cantidadComp, hielo, shaker,) {
        this.nombre = nombre;
        this.bebidaBase = bebidaBase;
        this.cantidadBase = cantidadBase;
        this.bebidaComp = bebidaComp;
        this.cantidadComp = cantidadComp;
        this.hielo = hielo.toUpperCase();
        this.shaker = shaker.toUpperCase();
    }
}

// Escuchar el Boton para iniciar el Ciclo do while document.getElementById("crearTragoBTN").addEventListener("click", hacerCicloTrago);

function hacerCicloTrago() {
// Ciclo for

for (var i = 0; i <= 1; i++) {
// Entrar info
const  trago = new Trago (
  document.getElementById("nuevoTrago").elements[0].value,
  document.getElementById("nuevoTrago").elements[1].value,
  document.getElementById("nuevoTrago").elements[2].value,
  document.getElementById("nuevoTrago").elements[3].value,
  document.getElementById("nuevoTrago").elements[4].value,
  document.getElementById("nuevoTrago").elements[5].value,
  document.getElementById("nuevoTrago").elements[6].value);

//Agregar al array el nuevo trago recien creado
listaTragos.push(trago);

//JSON y local storage del trago creado
const tragoJSON = JSON.stringify(trago);
localStorage.setItem(trago.nombre, tragoJSON);


alert(`Trago ${trago.nombre} Credo con EXITO`);

}

//Array Ordenado por .sort() Lo busque en stackoverflow porque no podia hacer que funcione 
listaTragos.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)) 
console.log(listaTragos);
}

// Escuchar el Boton para imprimir los tragos
document.getElementById("verTragoBTN").addEventListener("click", verTragos);

function verTragos() {
//Obtenemos el nodo donde vamos a agregar los nuevos elementos
let padre = document.getElementById("tragosImprimir");

var ls = top.localStorage,
  n = ls.length,
  i = 0,
  key, value;

console.log("Hay ", n, "items guardados en localStorage");

for (; i < n; i++) {
  key = ls.key(i);
  const value = ls.getItem(key);
  const propTrago = JSON.parse(value);
  console.log(JSON.parse(value));
  let ul = document.createElement("ul");
    if ((propTrago.shaker == "S") && (propTrago.hielo == "S")){
        ul.innerHTML = `<hr><h3>${key} </h3> <h4>Ingredientes:</h4></li> 
        <li> ${propTrago.bebidaBase} ${propTrago.cantidadBase} oz</li>
        <li> ${propTrago.bebidaComp} ${propTrago.cantidadComp} oz</li>
        <li>Vertir todo en el Shaker o Coctelera, agregar hielo y batir</li>
        <li>¡Listo! El trago ${propTrago.nombre} </b> esta listo para servir y beber</li>
        <br><br>`; 
    } else if ((propTrago.shaker == "N") && (propTrago.hielo == "S")){
        ul.innerHTML = `<hr><h3>${key} </h3> <h4>Ingredientes:</h4></li>
        <li> ${propTrago.bebidaBase} ${propTrago.cantidadBase} oz</li>
        <li> ${propTrago.bebidaComp} ${propTrago.cantidadComp} oz</li> 
        <li>Agregue hielo a gusto</li>
        <li>¡Listo! El trago <b> ${propTrago.nombre} </b> esta listo para servir y beber</li>
        <br><br>`;  
    } else{
        ul.innerHTML = `<hr><h3>${key} </h3> <h4>Ingredientes:</h4></li>
        <li>${propTrago.bebidaBase} ${propTrago.cantidadBase} oz</li>
        <li>${propTrago.bebidaComp} ${propTrago.cantidadComp} oz</li>
        <li>¡Listo! El trago <b> ${propTrago.nombre} </b> esta listo para servir y beber</li>
        <br><br>`;
    }
  padre.appendChild(ul);
  }
}