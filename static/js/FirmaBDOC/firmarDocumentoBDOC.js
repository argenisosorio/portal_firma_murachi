

function True_FalseBDOC(data){

    if (data == "true" ){
      return "Verdadero";
    }
    if (data ==  "false"){
      return "Falso";
    }
}

function SerealizeMyJsonBDOCf(data){
  for (var i = 0; i < data.signatures.length; i++) {
      data.signatures[i].isValid = True_FalseBDOC(data.signatures[i].isValid);
      data.signatures[i].signerCertificateIsValid = True_FalseBDOC(data.signatures[i].signerCertificateIsValid);
  }
  return data;
}

//Obtenemos la  informacion de documento
function InfoSignDocumentDataTableBDOC(signedFileId){

    $.ajax({
        url: "https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/"+signedFileId,
        type: "get",
        dataType: "json",        
        headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
        success: function(response) {

	          INFO_SIGN_BDOC = SerealizeMyJsonBDOCf(response);
	          CONT_SIGN_BDOC += 1;         

	          if (CONT_SIGN_BDOC == 1){
	              INFO_DATATABLE_SIGN_BDOC = DataTableSignBDOC(response);
	          }
	          if (CONT_SIGN_BDOC > 1){
	              INFO_DATATABLE_SIGN_BDOC.destroy();
	              INFO_DATATABLE_SIGN_BDOC = DataTableSignBDOC(response); 
	          } 
        },
        error: function(jqXHR, textStatus, errorThrown){
          	alert(textStatus+", "+ errorThrown+" el documento BDOC para mostrar la info de la sign");     
        }
	});
}

function FinalizarFirmaBDOC(signature, fileId){

	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		//url:"https://192.168.12.125:8443/Murachi/0.1/archivos/bdocs/resenas",
		//url:"https://192.168.12.125:8443/Murachi/0.1/archivos/bdocs/firmas/post",
		url:"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/bdocs/firmas/post",
		dataType: 'json',
		data: JSON.stringify({"signature":signature.hex, "containerId":fileId}),
		headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(data, textStatus, jqXHR){
			
			//var linkToDownload = "<a href=\"https://192.168.12.125:8443/Murachi/0.1/archivos/descargas/" + data['signedFileId'] +"\">descargar archivo firmado</a>"; 
			//var linkToDownload = "<a href=\"https://172.16.137.11:8443/Murachi/murachi/archivos/descargas/" + data['signedFileId'] +"\">descargar archivo firmado</a>";
			var linkToDownload = "<a class='hi-icon hi-icon-contract background' href=\"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/descargas/" + data['signedFileId'] +"\"></a>Descargar <br> Documento</h3>";
			document.getElementById("log_bdoc").innerHTML = '';  
			document.getElementById("respuesta_bdoc").innerHTML = '<h3>Archivo firmado<br> correctamente'+linkToDownload    			

			InfoSignDocumentDataTableBDOC(data['signedFileId']);		
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error en /bdocs/resenas: ' + textStatus);
			$("#respuesta_bdoc").html("error en /bdocs/resenas: " + textStatus);
		}
	});
						        			

}


// ahora llamar al ajax de obtener la resena del bdoc
function ObtenerHashPDFServerBDOC(parameters, cert, fileId){	

	$.ajax({
		type: 'POST',
		contentType: 'application/json',				
		//url:"https://192.168.12.125:8443/Murachi/0.1/archivos/bdocs",
		//url:"https://192.168.12.125:8443/Murachi/0.1/archivos/bdocs/firmas/pre",
		url:"https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/bdocs/firmas/pre",
		dataType: "json",
		data: parameters,
		headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(data, textStatus, jqXHR){
			var json_x = data;
			var hash = json_x['hash']; 
			var hashtype = "SHA-256";
			var lang = "eng";
			
			window.hwcrypto.sign(cert, {type: hashtype, hex: hash}, {lang: lang}).then(
				function(signature) {					        		
	        		FinalizarFirmaBDOC(signature, fileId);
      			}, 
      			function(err) {
	        		//log_bdoc_text("sign() failed: " + err);        	
                    var error;
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
	        		$("#respuesta_bdoc").html("sign() failed: " + error);
    	  	});
			
		},								
		error: function(jqXHR, textStatus, errorThrown){
			//alert('error: ' + textStatus);
			//var responseText = jQuery.parseJSON(jqXHR.responseText);
			alert('ajax error function: ' + jqXHR.responseText);
			$("#respuesta_bdoc").html("error function: " + jqXHR.responseText);
		}
		
	});

}

// Obtenemos el certificado Bdoc
function ObtenerCertificadoFirmanteBDOC(response){

	// identificador del archivo en el servidor
	var fileId = response.containerId.toString();
	
	// seleccionar certificado del firmante
	var cert;
	window.hwcrypto.getCertificate({lang: "en"}).then(
		function(response) {
	  		var cert = response;			
			var parameters = JSON.stringify({
				"fileId":fileId,
				"certificate":cert.hex,
				"city":"Merida",
				"state":"Merida",
				"postalCode":"5101",
				"country":"Venezuela",
				"role":"Analista",
				"addSignature":false
				});
			
			// ahora llamar al ajax de obtener la resena del pdf
			ObtenerHashPDFServerBDOC(parameters, cert, fileId);	
		}, 
		function(err) {
  			//log_bdoc_text("getCertificate() failed: " + err);
			var error;
			if(err == "Error: user_cancel") {
			    alert("getCertificate() failed: El usuario cancelo la operación");
			    error = "El usuario cancelo la operación"; 
			}      
			else if(err == "Error: no_certificates") {
			    alert("getCertificate() failed: No hay certificado disponible");
			    error = "No hay certificado disponible";
			}
			else if(err == "Error: no_implementation") {
			    alert("getCertificate() failed: No hay soporte para el manejo del certificado");
			    error = "No hay soporte para el manejo del certificado";
			}
			$("#respuesta_bdoc").html("getCertificate() failed: " + error);
		});
							

}

// Primer paso subimos documentos al servidor
function SubirDocumentServerBdoc(formData){
    
    $.ajax({
        //url: "https://192.168.12.125:8443/Murachi/0.1/archivos/bdocs/cargas",
        url: "https://murachi.cenditel.gob.ve/Murachi/0.1/archivos/bdocs/cargas",
        type: "post",
        dataType: "json",
        data: formData,
        cache: false,
        contentType: false,
		processData: false,
		headers: {"Authorization":"Basic YWRtaW46YWRtaW4="},
		success: function(response) {			
			ObtenerCertificadoFirmanteBDOC(response);

    	},     	
        error: function(xhr, status, error) {
     		//Que se ejecuta cuando finalice la petición de con error
			$("#respuesta_bdoc").html('Error...!!!');
     		
			alert(xhr.responseText);
			alert(error);
     		
			alert("ocurrio un error en cargas");     		             		
		}
    });
}


$("#Form-sign-bdoc").on('submit', function(even) {
	even.preventDefault();
	
	alert("siiiiiii")
	var formData = new FormData(); 
    for (var i=0; i<$("#file-sign-bdoc")[0].files.length; i++){
		formData.append("upload", $("#file-sign-bdoc")[0].files[i]);
	}	
    
    SubirDocumentServerBdoc(formData);
});


$("#Firmar_file_bdoc").on('click', function() {
	$("#button_SignBDOC").trigger('click');
});



$("#Cargar_file_bdoc").on('click', function() {
	$("#file-sign-bdoc").trigger('click');
});


$("#file-sign-bdoc").on('change', function() {
	$("#product-FirmaBDOC #Lateral-derecho-Bdoc").attr("class","item-small");
	$("#product-FirmaBDOC #icon-derecho-Bdoc").attr("class","hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a");	
	$("#Firmar_file_bdoc").attr("disabled","disabled");	
	
});