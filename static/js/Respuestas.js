function manejoJsonPDF(json) {
	
	var fielJsonEs = {fileId: "Identificador único del archivo en el servidor", fileExist:"El archivo se cargó exitosamente en el servidor", mimeType:"Tipo MIME del archivo verificado", error:"Extension not supported. En caso de que el archivo sea diferente de PDF y BDOC", numberOfSignatures:"Número de firmas existentes en el archivo", signatures:"Lista de firmas", signatureType:"Tipo de firma de archivo PDF", signedOn:"Fecha en que se realiza la firma", integrityCheck:"Chequea la integridad de la firma", timeStamp:"Estampilla de tiempo", reason:"Razón de la firma", location:"Ubicación donde se realiza la firma", alternativeNameOfTheSigner:"Nombre alternativo del firmante", signerCertificateValidFrom:"Fecha de inicio de validez del certificado", signerCertificateStillValid:"El certificado todavía está válido", signerCertificateHasExpired:"El certificado expiró", signatureCoversWholeDocument:"La firma abarca todo el documento PDF", filterSubtype:"Tipo de subfiltro: /adbe.pkcs7.sha1, /adbe.pkcs7.detached", signerCertificateSubject:"Sujeto firmante", signerCertificateValidAtTimeOfSigning:"El certificado es válido en el momento de la firma", encryptionAlgorithm:"Algoritmo de cifrado", timeStampService:"Servicio de estampillado de tiempo", digestAlgorithm:"Algoritmo hash (reseña)", certificatesVerifiedAgainstTheKeyStore:"Certificado verificado contra el repositorio de certificados confiables", documentRevision:"Número de revisión del documento PDF", nameOfTheSigner:"Nombre del firmante", totalDocumentRevisions:"Número total de revisiones del documento PDF", contactInfo:"Información de contacto del firmante", timeStampVerified:"Estampilla de tiempo verificada", signerCertificateIssuer:"Emisor del certificado firmante", signerCertificateValidTo:"Fecha de fin de validez del certificado", signerCertificateSerial:"BDOC: Serial del certificado del firmante", signatureProfile:"BDOC: Perfil de la firma", signatureMethod:"BDOC: Algoritmo de firma utilizado", signatureId:"BDOC: identificador de la firma", signatureSigningTime:"Fecha en que se realiza la firma", signerCertificateIsValid:"El certificado todavía está válido", signatureValidationException:"BDOC: Exepciones de la validación de la firma", isValid:"BDOC: Firma electrónica válida", signerCertificateSubjectName:"Nombre del firmante", containerValidation:"BDOC: Especifica si el contenedor posee una estructura válida", numberOfDataFiles:"BDOC: Cantidad de archivos incluidos en el contenedor BDOC", dataFiles:"BDOC: Lista de archivos incluidos en el contenedor", name:"BDOC: Nombre del archivo incluido en el contenedor", dataFileSize:"BDOC: Tamaño del archivo incluido en el contenedor", filename:"BDOC: Nombre del archivo incluido en el contenedor", mediaType:"BDOC: Tipo MIME del archivo incluido en el contenedor"};
	var objVarVerifique = JSON.parse(json);
	var signatures = ''; //variable que maneja las firmas
	var fields = ''; //variable que maneja los campos de la firma
	var title = '<h3> Información de la firma electronica </h3> \n ';
	var head = '<div class=\'container\'> \n <table id=\' \' class=\'display table table-striped table-bordered\' cellspacing=\'0\' width=\'100%\' > \n <thead> \n <tr>\n <th>#</th>\n <th>Campo</th>\n <th>Descripción</th> \n </tr>\n </thead>\n <tbody> \n';
	var footer = '</tbody> \n </table> \n </div> \n </div>';
	var html = title;
	var numsign = 0; 
    var htmltemp = '';
    var objxEsp = '';

	$.each(objVarVerifique, function(idx, obj) {
		
		if(idx == "error") {
			html = '<h4> Extensión no soportada, verifique el archivo </h4>';       
            return(html);
        }
            
		if(idx == "numberOfSignatures"){
			numsign = obj;
			html += '<h4>' + fielJsonEs[idx] + ': ' + obj +' </h4>\n <br><br>';
		}
			
		if(idx == "signatures") { 
			signatures = obj; //se almacena la(s) cabecera(s) de las firmas
		}
	});
				
	var contsing = 1; // variable que indica la firma donde esta posicionado 
				
	<!-- recorre las firmas signatures -->

	$.each(signatures, function(idx, obj) {	
		html += '<h4> Información de la firma: '+contsing+'<h4> \n';
		html += head;
		var contfiels = 8; // variable que indica el campo de la firma -- arranca en el campo 6 porque necesitamos que muestre de primero las 5 campos requeridos
		fields = obj; // variable que almacena los campos de la firma
		$.each(fields, function(id, objx) {

			<!-- Recorreo los campos de la firma -->
	        //alert('entro firma: ' + fielJsonEs[id]);
	        if(fielJsonEs[id]=='Nombre del firmante') {
	            //alert('entro campos de firma');
				html += '<tr>\n<td>'+'1'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objx +' </td>\n</tr>\n';
				//contfiels++;
			}
            else if(fielJsonEs[id]=='Fecha en que se realiza la firma') {
                //alert('entro campos de firma');
                html += '<tr>\n<td>'+'2'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objx +'     </td>\n</tr>\n';
                //contfiels++;
            }
			else if(fielJsonEs[id]=='Chequea la integridad de la firma') {
			    //alert('entro campos de firma');
			    if(objx == 'true') { objxEsp = 'verdadero';}                                                                                                  else {objxEsp='falso';}
			    html += '<tr>\n<td>'+'3'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objxEsp +'         </td>\n</tr>\n';
				//contfiels++;
			}
			else if(fielJsonEs[id]=='El certificado todavía está válido') {
			     if(objx == 'true') { objxEsp = 'verdadero';}                                                                                                  else {objxEsp='falso';}
			     html += '<tr>\n<td>'+'4'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objxEsp +'             </td>\n</tr>\n';
			     //contfiels++;
			}  
			else if(fielJsonEs[id]=='Fecha de inicio de validez del certificado') {
			     html += '<tr>\n<td>'+'5'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objx +'             </td>\n</tr>\n';
			     //contfiels++;
			}  	
			else if(fielJsonEs[id]=='Fecha de fin de validez del certificado') {
			     html += '<tr>\n<td>'+'6'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objx +'             </td>\n</tr>\n';
			     //contfiels++;
			} 
			else if(fielJsonEs[id]=='El certificado es válido en el momento de la firma') {
			     if(objx == 'true') { objxEsp = 'verdadero';}                                                                                                  else {objxEsp='falso';}
			     html += '<tr>\n<td>'+'7'+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objxEsp +'             </td>\n</tr>\n';
			     //contfiels++;
			}  
	        else { if(objx == 'true' ) { htmltemp += '<tr>\n<td>'+contfiels+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td    >' + 'verdadero' +' </td>\n</tr>\n';}
	        	else if(objx == 'false')  { htmltemp += '<tr>\n<td>'+contfiels+'</td>\n<td>' + fielJsonEs[id    ] + '</td>\n<td    >' + 'falso' +' </td>\n</tr>\n';}
	        	else { htmltemp += '<tr>\n<td>'+contfiels+'</td>\n<td>' + fielJsonEs[id] + '</td>\n<td>' + objx +' </td>\n</tr>\n'; }
				contfiels++;
			}     
		});
		contsing++;	
        html += htmltemp;
        htmltemp = '';              
		html += footer;
	});
	
	return(html);
}