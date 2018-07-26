
function True_False(data){

    if (data == "true" ){
      return "Verdadero";
    }
    if (data ==  "false"){
      return "Falso";
    }

}

function SerealizeMyJson(data){
  for (var i = 0; i < data.signatures.length; i++) {
      data.signatures[i].integrityCheck = True_False(data.signatures[i].integrityCheck);
      data.signatures[i].signerCertificateStillValid = True_False(data.signatures[i].signerCertificateStillValid);
      data.signatures[i].signerCertificateValidAtTimeOfSigning = True_False(data.signatures[i].signerCertificateValidAtTimeOfSigning);
      data.signatures[i].signatureCoversWholeDocument = True_False(data.signatures[i].signatureCoversWholeDocument);
      data.signatures[i].certificatesVerifiedAgainstTheKeyStore = True_False(data.signatures[i].certificatesVerifiedAgainstTheKeyStore);         
  }
  return data;
}


//Obtenemos la  informacion de documento
function InfoDocumentDataTablePDF(signedFileId){

    $.ajax({
        url: "https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/"+signedFileId,
        //url: "https://192.168.12.154:8443/Murachi/0.1/archivos/"+signedFileId,
        type: "get",
        dataType: "json",        
        headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
        success: function(response) {
            
	  		if (FIRMA_VISIBLE == true){          	

		        INFO_DATATABLE = SerealizeMyJson(response);
				
				CONT += 1;
				if (CONT == 1){
					DATATABLE_SIGN_VISIBLE = DataTablePDF(response);	

				}
				if (CONT > 1){
					DATATABLE_SIGN_VISIBLE.destroy();
					DATATABLE_SIGN_VISIBLE = DataTablePDF(response);	
				}	

				CONTAINER = false;
				$("#pdf-main-container").hide();
				$("#myJson_wrapper").show();					
			}
			else{

		        INFO_DATATABLE_NO_VISIBLE = SerealizeMyJson(response);
				CONT_NO_VISIBLE += 1;
				if (CONT_NO_VISIBLE == 1){
					DATATABLE_SIGN_NO_VISIBLE = DataTablePDFNoVisible(response);	

				}
				if (CONT_NO_VISIBLE > 1){
					DATATABLE_SIGN_NO_VISIBLE.destroy();
					DATATABLE_SIGN_NO_VISIBLE = DataTablePDFNoVisible(response);	
				}	

				CONTAINER2 = false;				
				$("#pdf-main-container2").hide();
				$("#myJsonPDF_NO_VISIBLE_wrapper").show();


			}
			
        },
        error: function(jqXHR, textStatus, errorThrown){
          	alert(textStatus+", "+ errorThrown+" el documento PDF para mostrar la info de la sign");     
        }
	});
}


// Cuarto paso (Se envia la información del token para terminar la firma)
function FinalizarFirma(signature){

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

			var linkToDownload = "<a class='hi-icon hi-icon-contract background' href=\"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/descargas/" + data['signedFileId'] +"\"></a>Descargar <br> Documento</h3>";
			//var linkToDownload = "<a href=\"https://192.168.12.154:8443/Murachi/0.1/archivos/descargas/" + data['signedFileId'] +"\"><h4>Descargar archivo firmado</h4></a>";
			document.getElementById("log").innerHTML = '';   
			document.getElementById("respuesta").innerHTML = '<h3>Archivo firmado<br> correctamente'+linkToDownload  			

			InfoDocumentDataTablePDF(data['signedFileId']);		

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error en pdfs/resenas: ' + textStatus);
			$("#respuesta").html("error en pdfs/resenas: " + textStatus);
		}
	});

}


//Tercer paso (Obtenemos el hash de pdf enviado por el servidor y luego procesa la información en el token)
function ObtenerHashPDFServer(parameters,cert){

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
					FinalizarFirma(signature.hex);
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
function ObtenerCertificadoFirmante(response){

	// identificador del archivo en el servidor
	var fileId = response.fileId.toString();
	var cert;

	window.hwcrypto.getCertificate({lang: "en"}).then(
		function(response) {
	  		var cert = response;
	  		var parameters = "";

			parameters = JSON.stringify({
				"fileId":fileId,
				"certificate":cert.hex,
				"reason":"Certificado",
				"location":"CENDITEL",
				"contact":"582746574336",
				"signatureVisible":"true",
				"signaturePage": VALOR_PAGE,
				"xPos": VALOR_X,
				"yPos": VALOR_Y
				});

			// ahora llamar al ajax de obtener la resena del pdf
			ObtenerHashPDFServer(parameters, cert);	

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
  			$("#respuesta").html("getCertificate() failed: " + error);
		}

	);
}




// Primer paso (Subir el documento al servidor)
function SubirDocumentServer(formData){

    $.ajax({
        //url: "https://192.168.12.154:8443/Murachi/0.1/archivos",                
        url: "https://murachi.cenditel.gob.ve/Murachi/0.1/archivos",
        type: "post",
        dataType: "json",
        data: formData,
        cache: false,
        contentType: false,
		processData: false,
		xhrFields: {withCredentials: true},
		headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(response) {

			document.getElementById("respuesta").innerHTML = manejoJsonPDF(JSON.stringify(response));	
			ObtenerCertificadoFirmante(response);
    	},
     	error: function(response) {
     		//Que se ejecuta cuando finalice la petición de con error
			$("#respuesta").html('Error, al subir el archivo al servidor...!!!');
     		alert("ocurrio un error, al subir el archivo al servidor")
		}
    });

}


$("#Form-Format-Visible").on('submit', function(event) {
	event.preventDefault();


	var formData = new FormData(); 
    formData.append("upload", $("#file-sign-ft_Vble")[0].files[0]);	
	
	$('#myJson_wrapper').hide();
	FIRMA_VISIBLE = true;
	//InfoDocumentDataTablePDF("89e830bb-8af4-4dfd-b423-e37c7e5593e6.pdf")
	SubirDocumentServer(formData);
	
});



$("#Firmar_file_Visible").on('click', function(event) {

	if (VALOR_X != null){
		$("#form-button").trigger('click');	
	}
	
	
});


