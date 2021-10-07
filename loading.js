function loading(){
    $("#loadingCard").append();
    $("#barraLoading").animate({width:"100%"},5000, function() {
        $("#cargando").fadeOut("slow").detach('slow');
        $("#loadingCard").fadeOut("slow").detach('slow');
        $("#barraLoading").animate({width:"1px"},1,)
    });
  };
