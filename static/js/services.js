

//Services

$("#Firma_Visible").on('click', function() {
  	$("#Contenido_FirmaBDOC").hide();
  	$("#Contenido_Firma_No_Visible").hide();
    $('#Contenido_FirmaMultiples').hide();       
  	$('#Contenido_VerificarPDF').hide();
  	$('#Contenido_VerificarBDOC').hide();    
  	$("#Contenido_Firma_Visible").show();

});


$("#Firma_NoVisible").on('click', function() {
  	$("#Contenido_Firma_Visible").hide();
    $('#Contenido_FirmaMultiples').hide();     
  	$("#Contenido_FirmaBDOC").hide();
  	$('#Contenido_VerificarPDF').hide();
  	$('#Contenido_VerificarBDOC').hide();  	
  	$("#Contenido_Firma_No_Visible").show();
});




$("#FirmaMultiples").on('click', function() {
    $("#Contenido_Firma_Visible").hide();
    $('#Contenido_FirmaMultiples').hide();     
    $("#Contenido_FirmaBDOC").hide();
    $('#Contenido_VerificarPDF').hide();
    $('#Contenido_VerificarBDOC').hide();   
    $("#Contenido_Firma_No_Visible").hide();
    $('#Contenido_FirmaMultiples').show();   
    FirmaMultiplesPDF();
});


$("#Firma_Bdoc").on('click', function() {
  	$("#Contenido_Firma_No_Visible").hide();
  	$("#Contenido_Firma_Visible").hide();
    $('#Contenido_FirmaMultiples').hide();       
    $('#Contenido_VerificarPDF').hide();  	
  	$('#Contenido_VerificarBDOC').hide();  
    $("#Contenido_FirmaBDOC").show();
});


$("#Verificar_PDF").on('click', function() {
    $("#Contenido_Firma_Visible").hide();
  	$("#Contenido_FirmaBDOC").hide();
  	$("#Contenido_Firma_No_Visible").hide();
    $('#Contenido_FirmaMultiples').hide();       
  	$('#Contenido_VerificarBDOC').hide();  
  	$('#Contenido_VerificarPDF').show();
});

$("#Verificar_BDOC").on('click', function() {
  	$("#Contenido_Firma_Visible").hide();
  	$("#Contenido_FirmaBDOC").hide();
  	$("#Contenido_Firma_No_Visible").hide();
    $('#Contenido_FirmaMultiples').hide();       
  	$('#Contenido_VerificarPDF').hide();
  	$('#Contenido_VerificarBDOC').show();
});



