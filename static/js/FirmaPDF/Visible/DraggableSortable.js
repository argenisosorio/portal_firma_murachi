
function InicializarObjectoPositicion(){
  var container = document.getElementById('container1'),
    element = document.getElementsByClassName('text')[0];
  
  // options
  var options = {
    limit: container,
    setCursor: true
  };

  // initialize drag
  new Draggable(element, options); 

}


function NuevoObjectoInicial(){

  var num = 0;
  $( ".text" ).draggable({ 
    containment: '#container1',
    scroll: false,
    stop: function(event, ui)
      {
       
        num+= 1;
        if (num == 1){
         $("#Contenido_Firma_Visible #Formato_Visible .text").hide();
         $("#Contenido_Firma_Visible #Lateral-derecho").attr("class","item-small");
         $("#Contenido_Firma_Visible #icon-derecho").attr("class","hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a");
          VALOR_X = 0;
          VALOR_Y = 0;
        }else{
          VALOR_X = parseInt(ui.position['left']);
          VALOR_Y = parseInt(ui.position['top']);
        }
        
      },
    
  });
}


var transferred = false;
$('.text').draggable({
    connectToSortable: "#pdf-main-container #pdf-contents2 div#container1",
    helper: 'clone',
    start: function(event, ui)
    {
        $(this).hide();
    },
    stop: function(event, ui)
    {

        if(!transferred) {
            $(this).show();
        }
        else{ 
        
            $(this).remove();
            transferred = false;
        }
    }
});


$('div#container1').sortable({
    connectWith: "#pdf-main-container #pdf-contents2 div#container1",
    receive: function(event, ui)
    { 
        transferred = true;
       $("#Firmar_file_Visible").removeAttr('disabled');        
        InicializarObjectoPositicion()
        NuevoObjectoInicial();      
    }
});
