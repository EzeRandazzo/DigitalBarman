$(document).ready(function(){
    $("#barraLoading").animate({width:"100%"},5000, function() {
        $("#cargando").fadeOut("slow").removeElementWithAnimation();
    });
  });


  // >> Consigna: codifica animaciones concatenadas sobre uno o más elementos. Es decir que luego de finalizar una animación en su función callback, se especifica la llamada a otra animación.
  // >>Aspectos a incluir en el entregable:
  // Archivo HTML y archivo JavaScript referenciado, que incluya la definición de dos o más animaciones y sus respectivas funciones callback.
