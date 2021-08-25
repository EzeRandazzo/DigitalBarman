// mensaje bienvenida
alert("Bienvenido al Simulador de Barman");
document.write("<h1>Bienvenido al Simulador de Barman</h1><br><br>");

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

// escribir info en el DOM
trago.imprimir();

//Agregar al array el nuevo trago recien creado
listaTragos.push(trago);
HacerOtro = prompt("¿Desea crear otro trago? (S/N)").toUpperCase();

}while(HacerOtro != "N");

//Array Ordenado por .sort()
listaTragos.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)) //Lo busque en stackoverflow porque no podia hacer que funcione 
console.log(listaTragos);