
function InfoContentPDF_No_Visible(id){
  
  for (var i = 0; i < INFO_DATATABLE_NO_VISIBLE.signatures.length; i++) {
    if (parseInt(INFO_DATATABLE_NO_VISIBLE.signatures[i]['documentRevision']) == parseInt(id)){

            var html1 = "";  

            html1 += '<font style="font-size: 14pt">';
            html1 += '<table  class="table table-hover color-table" width="100%" id="data" >';
            html1 += '<tr>';
            html1 += '<td style="text-align: left" width="700"><b>Nombre del firmante:</b> </td>';
            html1 += '<td style="text-align: left" width="500"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['nameOfTheSigner']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Fecha en que se realiza la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['signedOn']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Chequea la integridad de la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['integrityCheck']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>El certificado todavía está válido:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['signerCertificateStillValid']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Fecha de fin de validez del certificado:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['signerCertificateValidFrom']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Fecha de fin de validez del certificado:</b> </td>';
            html1 += '<td style="text-align: left"><span>' +INFO_DATATABLE_NO_VISIBLE.signatures[i]['signerCertificateValidTo']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>El certificado es válido en el momento de la firma:</b> </td>';
            html1 += '<td style="text-align: left" ><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['signerCertificateValidAtTimeOfSigning']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>Tipo de firma de archivo PDF:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['signatureType']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Estampilla de tiempo:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['timeStamp']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Razón de la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['reason']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Ubicación donde se realiza la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['location']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Nombre alternativo del firmante:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['alternativeNameOfTheSigner']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>La firma abarca todo el documento PDF:</b> </td>';
            html1 += '<td style="text-align: left"><span>' +INFO_DATATABLE_NO_VISIBLE.signatures[i]['signatureCoversWholeDocument']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>Tipo de subfiltro: /adbe.pkcs7.sha1, /adbe.pkcs7.detached:</b> </td>';
            html1 += '<td style="text-align: left" ><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['filterSubtype']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Sujeto firmante:</b> </td>';
            html1 += '<td style="text-align: left"><span><font style="font-size: 8pt">' +INFO_DATATABLE_NO_VISIBLE.signatures[i]['signerCertificateSubject']+'</font></span></td>';
            html1 += '</tr>';
            html1 += '<td style="text-align: left" ><b>Algoritmo de cifrado:</b> </td>';
            html1 += '<td style="text-align: left" ><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['encryptionAlgorithm']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>Servicio de estampillado de tiempo:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['timeStampService']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Algoritmo hash (reseña):</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['digestAlgorithm']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Certificado verificado contra el repositorio de certificados confiables:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['certificatesVerifiedAgainstTheKeyStore']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Número de revisión del documento PDF:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['documentRevision']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Número total de revisiones del documento PDF:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['totalDocumentRevisions']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Información de contacto del firmante:</b> </td>';
            html1 += '<td style="text-align: left"><span>' +INFO_DATATABLE_NO_VISIBLE.signatures[i]['contactInfo']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>Estampilla de tiempo verificada:</b> </td>';
            html1 += '<td style="text-align: left" ><span> '+INFO_DATATABLE_NO_VISIBLE.signatures[i]['timeStampVerified']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Emisor del certificado firmante:</b> </td>';
            html1 += '<td style="text-align: left"><span><font style="font-size: 8pt">' +INFO_DATATABLE_NO_VISIBLE.signatures[i]['signerCertificateIssuer']+'</font></span></td>';
            html1 += '</tr>';;
            html1 += '</table>';
            html1 += '</font>';

            $('div#Dialogo-table-no-visible').append(html1); 
    }
  }
}

function DialogNOvisible(id){
   document.getElementById("Dialogo_signNoVisible").innerHTML = '\
    <style>\
     .modal .modal-dialog { width: 80%; height: 80%, };\
    </style>\
       <div id="myModalNOvisible" class="modal fade" role="dialog">\
       <div class="modal-dialog">\
         <div class="modal-content">\
           <div id = "title" class="modal-header"><br><br><br>\
             <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->\
             <h2 class="modal-title text-primary"><center>Información de la Firma('+id+')</center></h2>\
           </div>\
           <div id = "body" class="modal-body">\
             <br>\
             <div id="Dialogo-table-no-visible"></div>\
            </div>\
            <div class="modal-footer">\
              <button type="button" id="informacion" data-dismiss="modal">Close</button>\
            </div>\
          </div>\
        </div>\
    </div>';

    InfoContentPDF_No_Visible(id);
  
}


function DataTablePDFNoVisible(response){
  
    //$(document).ready(function () { 
    	var table = $('#myJsonPDF_NO_VISIBLE').DataTable({
          //retrieve: true,
          //paging: false,
          //searching: false,                            
           language: {
              "lengthMenu": "Mostrar _MENU_ registros",
              "zeroRecords": "No hay resultados - Disculpe",
              "info": "Mostrando pagina _PAGE_ de _PAGES_",
              "search": "Buscar:", 
              "infoEmpty": "No records available",
              "infoFiltered": "(filtered from _MAX_ total records)"
           },
           columnDefs: [
              {"className": "dt-center", "targets": "_all"}
           ],                       
           order: [[ 1, 'desc' ]],       
           data: response.signatures,
           columns: [
              {title: "Nombre del firmante", data: "nameOfTheSigner"  },
              {title: "Fecha en que se realiza la firma", data: "signedOn"},         
              {title: "Chequea la integridad de la firma", data: "integrityCheck"},
              {title: "El certificado todavía está válido", data: "signerCertificateStillValid"},
              {title: "Fecha de inicio de validez del certificado", data: "signerCertificateValidFrom"},                        
              {title: "Fecha de fin de validez del certificado", data: "signerCertificateValidTo"},
              {title: "El certificado es válido en el momento de la firma", data: "signerCertificateValidAtTimeOfSigning"},                
              {title: "Tipo de firma de archivo PDF", data: "signatureType"},
              {title: "Estampilla de tiempo", data: "timeStamp"},
              {title: " Razón de la firma", data: "reason"},
              {title: "Ubicación donde se realiza la firma", data: "location"},
              {title: "Nombre alternativo del firmante", data: "alternativeNameOfTheSigner"},
              {title: "La firma abarca todo el documento PDF", data: "signatureCoversWholeDocument"},
              {title: "Tipo de subfiltro: /adbe.pkcs7.sha1, /adbe.pkcs7.detached", data: "filterSubtype"},
              {title: "Sujeto firmante", data: "signerCertificateSubject"},
              {title: "Algoritmo de cifrado", data: "encryptionAlgorithm"},
              {title: "Servicio de estampillado de tiempo", data: "timeStampService"},
              {title: "Algoritmo hash (reseña)", data: "digestAlgorithm"},
              {title: "Certificado verificado contra el repositorio de certificados confiables", data: "certificatesVerifiedAgainstTheKeyStore"},
              {title: "Número de revisión del documento PDF", data: "documentRevision"},
              {title: "Número total de revisiones del documento PDF", data: "totalDocumentRevisions"},
              {title: "Información de contacto del firmante", data: "contactInfo", style:"width: 2px;"},
              {title: "Estampilla de tiempo verificada", data: "timeStampVerified"},
              {title: "Emisor del certificado firmante", data: "signerCertificateIssuer"},
              {title:"Información", data: function(event){
                                              return '<button id="informacion" type="input" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalNOvisible" onclick="javascript:DialogNOvisible('+event.documentRevision+')">Info(<font color="red">'+event.documentRevision+'</font>)</button>';
                                         } 
              }
           ],                           
          dom: 'Bfrtip',
          columnDefs: [
              {
                  "targets": [ 2,3,4,5,6,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23 ],
                  "visible": false,
                  //"searchable": false
              },
              
           ],                           
           buttons: [
                {
                    extend:    'pageLength',
                    text:      'Mostrar Filas', 
                    titleAttr: 'Mostrar Filas',
                },
                {
                    extend:    'print',
                    text:      'Imprimir',
                    title:     'Contenido de la Firma',
                    message:   'Datos de la Firma',
                    titleAttr: 'Imprimir',
                    exportOptions: {
                      columns: [ 0,1,2,3,4,5,6,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
                    } 
                },
                {
                    extend:    'excelHtml5',
                    text:      'XLXS',
                    title:     'Contenido de la Firma',
                    titleAttr: 'Excel',
                    message: 'Datos de la Firma',
                    exportOptions: {
                      columns: [ 0,1,2,3,4,5,6,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
                    }
                },
                {
                    extend:    'csvHtml5',
                    text:      'CSV',
                    title:     'Contenido de la Firma',
                    titleAttr: 'CSV',
                    exportOptions: {
                      columns: [ 0,1,2,3,4,5,6,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
                    }
                },
                {
                    extend:    'pdfHtml5',
                    text:      'PDF',
                    titleAttr: 'PDF',
                    title:     'Contenido de la Firma',                    
                    download: 'open',
                    customize: function (doc){
                       doc.defaultStyle.fontSize = 3;
                       doc.styles.tableHeader.fontSize = 4;
                       doc.styles.tableHeader.fillColor = "#0085a1";
                    },
                    //orientation: 'landscape',
                    pageSize: 'A3',
                    exportOptions: {
                      columns: [ 0,1,2,3,4,5,6,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23]
                    
                    }
                }                
          ]           
      });
    return table;
	//});  

}