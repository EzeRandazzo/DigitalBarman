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
    imprimir(){
        document.write("<br><h2>Su trago " + this.nombre +"</h2><br><h3>Lleva los siguientes ingredientes:</h3><br>");
        document.write("-" + this.bebidaBase + " cantidad(oz): " + this.cantidadBase + "<br>");
        document.write("-" + this.bebidaComp + " cantidad(oz): " + this.cantidadComp + "<br>");
        if ((this.shaker == "S") && (this.hielo == "S")){
            document.write("-Vertir todo en el Shaker o Coctelera, agregar hielo y batir<br>");
            document.write("-Listo el trago <b>"+this.nombre+"</b> esta listo para servir y beber<br>"); 
        } else if ((this.shaker == "N") && (this.hielo == "S")){
            document.write("-Agregue hielo a gusto<br>");
            document.write("-Listo el trago <b>"+this.nombre+"</b> esta listo para servir y beber<br>");  
        } else{
            document.write("-Listo el trago <b>"+this.nombre+"</b> esta listo para servir y beber<br>");   
        }
    }
}

// Escuchar el Boton para iniciar el Ciclo do while
document.getElementById("crearTragoBTN").addEventListener("click", hacerCicloTrago);

function hacerCicloTrago() {
// Ciclo do while
do{ 
// Entrar info
const  trago = new Trago (
        prompt("Ingrese el nombre del trago"),
        prompt("Ingrese la bebeida base"),
        prompt("Ingrese la cantidad de oz"),
        prompt("Ingrese la bebeida complemetaria"),
        prompt("Ingrese la cantidad de oz"),
        prompt("¿Lleva hielo? (S/N)"),
        prompt("¿Va al Shaker/Coctelera? (S/N)")
    );

//Agregar al array el nuevo trago recien creado
listaTragos.push(trago);

const tragoJSON = JSON.stringify(trago);

localStorage.setItem(trago.nombre, tragoJSON);
HacerOtro = prompt("¿Desea crear otro trago? (S/N)").toUpperCase();

}while(HacerOtro != "N");
//Array Ordenado por .sort() Lo busque en stackoverflow porque no podia hacer que funcione 
listaTragos.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)) 
console.log(listaTragos);
}

// Escuchar el Boton para imprimir los tragos
document.getElementById("verTragoBTN").addEventListener("click", verTragos);

function verTragos() {
//Obtenemos el nodo donde vamos a agregar los nuevos elementos
let padre = document.getElementById("tragosImprimir");

//Iteramos el array con for...of
for (trago of listaTragos) {
    //Creamos un nodo <li> y agregamos al padre en cada ciclo
    let li = document.createElement("li");
    li.innerHTML = trago.imprimir();
    padre.appendChild(li);
}
}
