function True_FalseVerifi(data){
  if (data == "true" ){
    return "Verdadero";
  }
  if (data ==  "false"){
    return "Falso";
  }
}

function SerealizeMyJsonBDOC(data){
  for (var i = 0; i < data.signatures.length; i++) {
    data.signatures[i].isValid = True_FalseVerifi(data.signatures[i].isValid);
    data.signatures[i].signerCertificateIsValid = True_FalseVerifi(data.signatures[i].signerCertificateIsValid);
  }
  return data;
}

function SerealizeMyJsonPDFF(data){
  for (var i = 0; i < data.signatures.length; i++) {
    data.signatures[i].integrityCheck = True_FalseVerifi(data.signatures[i].integrityCheck);
    data.signatures[i].signerCertificateStillValid = True_FalseVerifi(data.signatures[i].signerCertificateStillValid);
    data.signatures[i].signerCertificateValidAtTimeOfSigning = True_FalseVerifi(data.signatures[i].signerCertificateValidAtTimeOfSigning);
    data.signatures[i].signatureCoversWholeDocument = True_FalseVerifi(data.signatures[i].signatureCoversWholeDocument);
    data.signatures[i].certificatesVerifiedAgainstTheKeyStore = True_FalseVerifi(data.signatures[i].certificatesVerifiedAgainstTheKeyStore);     
  }
  return data;
}

/*
|----------------------------------------------------------------
| Función que al parecer es la que consulta y valida el documento
| subido al servidor de Murachí, aún faltan probar mas cosas.
|----------------------------------------------------------------
*/
function VerificarDocumentServer(formDat, Extension){
  $.ajax({
    url: "https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/firmados",
    type: "post",
    dataType: "json",
    data: formDat,
    cache: false,
    contentType: false,
    processData: false,
    xhrFields:{withCredentials: true},
    headers:{"Authorization":"Basic YWRtaW46YWRtaW4="},
    success: function(response){
      if (response.signatures){
        // Si el formato que recibe la función es PDF entre aquí.
        if (Extension == "PDF"){
          INFO_CHECK = SerealizeMyJsonPDFF(response);
          CONT_VERIFIC += 1;
          if (CONT_VERIFIC == 1){
            // Si entra aquí cargará la tabla en el dom, esto para la verificación de documentos PDF.
            INFO_DATATABLE_VERIFICAR = DataTableVerificarPDF(response);
          }
          if (CONT_VERIFIC > 1){
            INFO_DATATABLE_VERIFICAR.destroy();
            INFO_DATATABLE_VERIFICAR = DataTableVerificarPDF(response);
          }
        }
        // Si el formato que recibe la función es BDOC entre aquí.
        else{
          $("div#MensajeBDOC").html("");
          INFO_CHECK_BDOC = SerealizeMyJsonBDOC(response);
          CONT_VERIFIC_BDOC += 1;
          if (CONT_VERIFIC_BDOC == 1){
            INFO_DATATABLE_VERIFICAR_BDOC = DataTableVerificarBDOC(response);
          }
          if (CONT_VERIFIC_BDOC > 1){
            INFO_DATATABLE_VERIFICAR_BDOC.destroy();
            INFO_DATATABLE_VERIFICAR_BDOC = DataTableVerificarBDOC(response);
          }
        }
      }
      else{
        $("div#myCkeckBDOC_wrapper").hide();
        $("div#myCkeckPDF_wrapper").hide();
        if (Extension == "PDF"){
          if (response.error){
            $("div#MensajePDF").html("<h1>Extensión no soportada, verifique el archivo que sea PDF.</h1>");
          }
          else{
            $("div#MensajePDF").html("<h1>No posee información de la firma electrónica.</h1>");
          }    
        }
        else{
          if (response.error){
            $("div#MensajeBDOC").html("<h1>Extensión no soportada, verifique el archivo que sea (.bdoc).</h1>");
          }
          else{
            $("div#MensajeBDOC").html("<h1>No posee información de la firma electrónica.</h1>");
          }
        }
      }
    },
    error: function(response){
      // Si no se pudo cargar el documento en el servidor de Murachí
      // luego de ser enviado desde el formulario para hacer
      // la verificación se mostrará este mensaje.
      alert("Ocurrio un error, al subir el archivo al servidor")
    }
  });
}

/*
|---------------------------------------------------------
| Funciones que gestionan el envío de documentos desde el
| formulario de verificación de documentos en formato PDF.
|---------------------------------------------------------
*/
$("#Form-check-pdf").on('submit', function(event) {
  event.preventDefault();
  var formDat = new FormData();
  formDat.append("upload", $("#verificar-file-pdf")[0].files[0]);
  if(['application/pdf'].indexOf($("#verificar-file-pdf").get(0).files[0].type) == 0) {
    VerificarDocumentServer(formDat,"PDF");
    //return;
    //$("div#MensajePDF").html("<h1>Verificación del documento exitosa.</h1>");
    $("div#MensajePDF").html("");
  }
  else{
    // Imprimir en el div el mensaje de extensión no soportada.
    $("div#MensajePDF").html("<h1>Extensión no soportada, verifique que el documento tenga formato PDF.</h1>");
  }
});

// Evento click on submit en el formulario.
$("#Submit-Form-check-pdf").on('click', function() {
  $("#button_CheckPDF").trigger('click');
});

$("#CheckSignPDF").on('click', function() {
  $("#verificar-file-pdf").trigger('click');
});

$("#verificar-file-pdf").on('change', function() {
  $("#product-VerificarPDF #Lateral-derecho-CheckPDF").attr("class","item-small");
  $("#product-VerificarPDF #icon-derecho-CheckPDF").attr("class","hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a"); 
  $("#Submit-Form-check-pdf").attr("disabled","disabled"); 
});

/*
|----------------------------------------------------------
| Funciones que gestionan el envío de documentos desde el
| formulario de verificación de documentos en formato BDOC.
|----------------------------------------------------------
*/
$("#Form-check-BDOC").on('submit', function(event) {
  event.preventDefault();
  if ($("#verificar-file-BDOC")[0].files[0].name.slice(-4).toLowerCase() == "bdoc"){
    var formDat = new FormData(); 
    formDat.append("upload", $("#verificar-file-BDOC")[0].files[0]); 
    VerificarDocumentServer(formDat,"BDOC")
  }
  else{
    $("div#myCkeckBDOC_wrapper").hide();
    $("div#MensajeBDOC").html("<h1>Extensión no soportada, verifique el archivo que sea (.bdoc).</h1>");
  }
});

$("#Submit-Form-check-BDOC").on('click', function() {
  $("#button_CheckBDOC").trigger('click');
});

$("#CheckSignBDOC").on('click', function() {
  $("#verificar-file-BDOC").trigger('click');
});

$("#verificar-file-BDOC").on('change', function() {
  $("#product-VerificarBDOC #Lateral-derecho-CheckBDOC").attr("class","item-small");
  $("#product-VerificarBDOC #icon-derecho-CheckBDOC").attr("class","hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a"); 
  $("#Submit-Form-check-BDOC").attr("disabled","disabled"); 
});