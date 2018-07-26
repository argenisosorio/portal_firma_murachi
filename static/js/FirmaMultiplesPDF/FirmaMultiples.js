


function True_FalseMultiples(data){

    if (data == "true" ){
      return "Verdadero";
    }
    if (data ==  "false"){
      return "Falso";
    }

}

function SerealizeMyJsonMultiples(data){
  for (var i = 0; i < data.signatures.length; i++) {
      data.signatures[i].integrityCheck = True_FalseMultiples(data.signatures[i].integrityCheck);
      data.signatures[i].signerCertificateStillValid = True_FalseMultiples(data.signatures[i].signerCertificateStillValid);
      data.signatures[i].signerCertificateValidAtTimeOfSigning = True_FalseMultiples(data.signatures[i].signerCertificateValidAtTimeOfSigning);
      data.signatures[i].signatureCoversWholeDocument = True_FalseMultiples(data.signatures[i].signatureCoversWholeDocument);
      data.signatures[i].certificatesVerifiedAgainstTheKeyStore = True_FalseMultiples(data.signatures[i].certificatesVerifiedAgainstTheKeyStore);         
  }
  return data;
}


//Obtenemos la  informacion de documento
function InfoDocumentDataTablePDFMultiples(signedFileId){

    $.ajax({
         url: "https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/"+signedFileId,
        //url: "https://192.168.12.154:8443/Murachi/0.1/archivos/"+signedFileId,
        type: "get",
        dataType: "json",        
        headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
        success: function(response) {
            
	  		
	        INFO_DATATABLE_MULTIPLES = SerealizeMyJsonMultiples(response);
			
			CONT_MULTIPLES += 1;
			if (CONT_MULTIPLES == 1){
				DATATABLE_SIGN_MULTIPLES = DataTablePDFMultiples(response);	

			}
			if (CONT_MULTIPLES > 1){
				DATATABLE_SIGN_MULTIPLES.destroy();
				DATATABLE_SIGN_MULTIPLES = DataTablePDFMultiples(response);	
			}	


			$("#iframe").hide();
			$("#myJsonPDFMultiples_wrapper").show();								


			
        },
        error: function(jqXHR, textStatus, errorThrown){
          	alert(textStatus+", "+ errorThrown+" el documento PDF para mostrar la info de la sign");     
        }
	});
}


// Cuarto paso (Se envia la información del token para terminar la firma)
function FinalizarFirmaMultiples(signature){

	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		//url:"https://192.168.12.154:8443/Murachi/0.1/archivos/pdfs/resenas",
		url:"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/pdfs/resenas",
		dataType: 'json',
		data: JSON.stringify({"signature":signature}),
		xhrFields: {withCredentials: true},
		headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(data, textStatus, jqXHR){
  
			document.getElementById("respuesta_FirmaMultiples").innerHTML = '<p>Archivo firmado correctamente</ṕ>';  			
			InfoDocumentDataTablePDFMultiples(data['signedFileId']);		

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error en pdfs/resenas: ' + textStatus);
			$("#respuesta").html("error en pdfs/resenas: " + textStatus);
		}
	});

}


//Tercer paso (Obtenemos el hash de pdf enviado por el servidor y luego procesa la información en el token)
function ObtenerHashPDFServerMultiples(parameters,cert){

	$.ajax({
		type: 'POST',
		contentType: 'application/json',				
		//url:"https://192.168.12.154:8443/Murachi/0.1/archivos/pdfs2",
		url:"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/pdfs2",
		dataType: "json",
		data: parameters,		
		xhrFields: {withCredentials: true},
		headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(data, textStatus, jqXHR){
			var json_x = data;
			var hash = json_x['hash']; 
			//alert("hash recibido del servidor "+hash);		
			var hashtype = "SHA-256";
			var lang = "eng";
			
			//Procesa la información
			window.hwcrypto.sign(cert, {type: hashtype, hex: hash}, {lang: lang}).then(
				function(signature) {
					FinalizarFirmaMultiples(signature.hex);
      			}, 
      			function(err) {
	        		log_text("sign() failed: " + err);
					var error;
                    log_text("sign() failed: " + err);
                    if(err == "Error: user_cancel") {
                        alert("sign() failed: El usuario cancelo la operación");
                        error = "El usuario cancelo la operación"; 
                     }      
                     else if(err == "Error: no_certificates") {
                         alert("sign() failed: No hay certificado disponible");
                         error = "No hay certificado disponible";
                     }
                     else if(err == "Error: no_implementation") {
                         alert("sign() failed: No hay soporte para el manejo del certificado");
                         error = "No hay soporte para el manejo del certificado";
                     }

	        		//alert("sign() failed: " + err);
	        		$("#respuesta").html("sign() failed: " + error);
    	  	});
			
		},								
		error: function(jqXHR, textStatus, errorThrown){
			//alert('error: ' + textStatus);
			//var responseText = jQuery.parseJSON(jqXHR.responseText);
			alert('ajax error function: ' + jqXHR.responseText);
			$("#respuesta").html("error function: " + jqXHR.responseText);
		}
		
	});
		
}


//Segundo paso (Seleccionamos el Certificado Firmante)
function Firmar_Multiple(fileId){
	document.getElementById("respuesta_FirmaMultiples").innerHTML = ''; 
	// identificador del archivo en el servidor
	

	window.hwcrypto.getCertificate({lang: "en"}).then(
		function(response) {
	  		var cert = response;
	  		console.log(response);
	  		console.log("ssss");
	  		var parameters = "";
			parameters = JSON.stringify({
				"fileId":fileId,
				"certificate":cert.hex,
				"reason":"Certificado",
				"location":"CENDITEL",
				"contact":"582746574336",
				"signatureVisible":"false",
				"signaturePage": "",
				"xPos": "",
				"yPos": ""
				});				

			// ahora llamar al ajax de obtener la resena del pdf
			ObtenerHashPDFServerMultiples(parameters, cert);	

		}, 
		function(err) {
  			//log_text("getCertificate() failed: " + err);
            var error;
            if(err == "Error: user_cancel") {
                alert("getCertificate() failed: El usuario cancelo la operación"    );
                error = "El usuario cancelo la operación"; 
             }      
             else if(err == "Error: no_certificates") {
                 alert("getCertificate() failed: No hay certificado disponible")    ;
                 error = "No hay certificado disponible";
             }
             else if(err == "Error: no_implementation") {
                 alert("getCertificate() failed: No hay soporte para el manejo del certificado");
                 error = "No hay soporte para el manejo del certificado";
			}
  			//alert("getCertificate() failed: " + err);
  			$("#respuesta_FirmaMultiples").html("getCertificate() failed: " + error);
		}

	);
}








function FirmaMultiplesPDF(){
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url:"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/listado",
        type: "get",
        dataType: "json",        
        headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(response, textStatus, jqXHR){

			var html = '';
			var html1 = '';
			var cont = 0;

			for (var i = 0; i < response.murachiWorkingDirectoryContent.length; i++)
			{ 
				var data =  response.murachiWorkingDirectoryContent[i].split(".");
				if ( data.length > 1 && data[1] ==  "pdf"){
					
		            html += '<div class="col-md-3 col-sm-6">';
					html += '<div class="product-item">';
		            html += '<div class="item-thumb">';                                   
					html += '<div class="overlay">';
					html += '<div class="overlay-inner">';
					html += '<a data-toggle="modal" data-target="#myModalMultiple"  onclick="javascript:Dialog_Multiple(\'' + response.murachiWorkingDirectoryContent[i] + '\')" class="view-detail">Firma (PDF)</a>';
					html += '</div>';
					html += '</div> <!-- /.overlay -->';
					html += '<embed src="https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/listadopdf/'+response.murachiWorkingDirectoryContent[i]+'" width="260" height="250" frameborder="0">';
					html += '<h3>'+response.murachiWorkingDirectoryContent[i]+'</h3>';
					html += '</div> <!-- /.item-thumb -->';
					html += '</div> <!-- /.product-item -->';                        
					html += '</div> <!-- /.col-md-3 --> ';					
					 
				}
				cont +=1;

				if (cont%2 == 0){
					if (i == 1){
						html1 += '<div class="item active">';	
					}
					else{
						html1 += '<div class="item">';
					}
					html1 += '<div class="row col-sm-12 col-md-offset-3">';
					html1 += html; 
					html1 += '</div></div>';
					html = '';
				}

			}
			$('#myCarousel #carousel_inner').html(html1);

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error en pdfs/resenas: ' + textStatus);
			$("#respuesta").html("error en pdfs/resenas: " + textStatus);
		}
	});


}




function Dialog_Multiple(id){
	// \<embed src="https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/listadopdf/'+cadena+'" width="100" height="500" frameborder="0"></embed>\
	$("#iframe").show();
	$("#myJsonPDFMultiples_wrapper").hide();   
	document.getElementById("title_myModalMultiple").innerHTML = 'Documento N° ('+id+')';
	document.getElementById("respuesta_FirmaMultiples").innerHTML = ''; 
	$("iframe#iframe").removeAttr("src")
	$("iframe#iframe").attr("src",'https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/listadopdf/'+id);
	$("td#1 #iconPencil").attr("href",'https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/descargas/'+id);
	$("td#2 #iconPencil2").attr("onclick",'javascript:VisualizarPDF(\'' + id + '\')');
	$("td#3 #iconPencil3").attr("onclick",'javascript:InfoDocumentDataTablePDFMultiples(\'' + id + '\')');
	$("td#4 #iconPencil4").attr("onclick",'javascript:Firmar_Multiple(\'' + id + '\')');
  
	
/*
   document.getElementById("Dialogo_Multiple").innerHTML = '\
    <style>\
     .modal .modal-dialog { width: 80%; height: 80%, };\
    </style>\
    <div class="modal fade" id="myModalMultipl" data-modal-index="1"><br><br><br>\
       <div class="modal-dialog">\
         <div class="modal-content">\
           <div id = "title" class="modal-header">\
             <br><br><button type="button" class="close" data-dismiss="modal">&times;</button>\
             <h2 class="modal-title text-primary"><center> Documento N° ('+id+')</center></h2>\
           </div>\
           <div id = "body" class="modal-body">\
           		<br>\
           		<div class="row col-sm-12 col-md-offset-2" id="iframe">\
           		   <iframe src="https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/listadopdf/'+id+'" width="70%" height="500px" frameborder="0"></iframe>\
        	   	</div>\
        	   	<table id="myJsonPDFMultiples" class="display color-table" cellspacing="0" width="100%"></table>\
        	   	<div id="Dialogo-Multiples"> </div>\
            </div>l\
            <div class=" modal-footer">\
             <table ALIGN=CENTER ><tr>\
             	<td><div class ="hi-icon-wrap hi-icon-effect-6"><a type="button" id="iconPencil" href="https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/descargas/' + id + '"  class="hi-icon hi-icon-contract background"></a><p>DESCARGAR</p></div></td>\
				<td><div class ="hi-icon-wrap hi-icon-effect-6"><a type="button" id="iconPencil" onclick="javascript:VisualizarPDF(\'' + id + '\')"  class="hi-icon hi-icon-refresh background"></a><p>VISUALIZAR</p></div></td>\
            	<td><div class ="hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a"><a type="button" id="iconPencil" onclick="javascript:InfoDocumentDataTablePDFMultiples(\'' + id + '\')"  class="hi-icon hi-icon hi-icon-list background"></a><p>VERIFICAR</p></div></td>\
            	<td><div class ="hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a"><a type="button" id="iconPencil" onclick="javascript:Firmar_Multiple(\'' + id + '\')"  class="hi-icon hi-icon-pencil background"></a><p>FIRMAR</p></div></td>\
            	<td><div class ="hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a"><a type="button" id="iconnn" data-dismiss="modal" class="hi-icon hi-icon-locked background"></a><p>CERRAR</p></div></td>\
             </tr></table>\
         </div>\
       </div>\
    </div></div>\
    ';
*/

}


function VisualizarPDF(id){
	document.getElementById("respuesta_FirmaMultiples").innerHTML = ''; 
	$("#iframe").show();
	$("#myJsonPDFMultiples_wrapper").hide();

}