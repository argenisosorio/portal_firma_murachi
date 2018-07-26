
function InfoContentSignBDOC(id){
  

  for (var i = 0; i < INFO_SIGN_BDOC.signatures.length; i++) {
    if (INFO_SIGN_BDOC.signatures[i]['signatureId'] == ("S"+id)){

            var html1 = "";  

            html1 += '<font style="font-size: 14pt">';
            html1 += '<table  class="table table-hover color-table" width="100%" id="data" >';
            html1 += '<tr>';
            html1 += '<td style="text-align: left" width="700"><b>Nombre del firmante:</b> </td>';
            html1 += '<td style="text-align: left" width="500"><span> <font style="font-size: 10pt">'+INFO_SIGN_BDOC.signatures[i]['signerCertificateSubjectName']+'</font></span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Fecha y hora de la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['signatureSigningTime']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Firma válida:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['isValid']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>El certificado todavía está válido:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['signerCertificateIsValid']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Código postal:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+(INFO_SIGN_BDOC.signatures[i]['signaturePostalCode']?INFO_SIGN_BDOC.signatures[i]['signaturePostalCode']:"Null")+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Serial del certificado del firmante:</b> </td>';
            html1 += '<td style="text-align: left"><span>' +INFO_SIGN_BDOC.signatures[i]['signerCertificateSerial']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>Perfil de la firma:</b> </td>';
            html1 += '<td style="text-align: left" ><span> '+INFO_SIGN_BDOC.signatures[i]['signatureProfile']+'</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>Estado donde se realiza la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+(INFO_SIGN_BDOC.signatures[i]['signatureState']?INFO_SIGN_BDOC.signatures[i]['signatureState']:"Null")+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Algoritmo de firma utilizado:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['signatureMethod']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Identificador de la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['signatureId']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Emisor del certificado firmante:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['signerCertificateIssuer']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Ciudad donde se realiza la firma:</b> </td>';
            html1 += '<td style="text-align: left"><span> '+INFO_SIGN_BDOC.signatures[i]['signatureCity']+'</span></td>';
            html1 += '</tr>';
            html1 += '<tr>';
            html1 += '<td style="text-align: left"><b>Excepción de validación:</b> </td>';
            html1 += '<td style="text-align: left"><span>signature' +INFO_SIGN_BDOC.signatures[i]['signatureId']+'ValidationException1</span></td>';
            html1 += '</tr>'; 
            html1 += '<tr>';
            html1 += '<td style="text-align: left" ><b>País donde se realiza la firma:</b> </td>';
            html1 += '<td style="text-align: left" ><span> '+(INFO_SIGN_BDOC.signatures[i]['signatureCountry']?INFO_SIGN_BDOC.signatures[i]['signatureCountry']:"Null")+'</span></td>';
            html1 += '</tr>';
            html1 += '</table>';
            html1 += '</font>';

            $('div#Dialogo_SIGN-table').append(html1); 
    }
  }
}

function Dialog_SignBDOC(id){
   document.getElementById("Dialogo_SignBdoc").innerHTML = '\
    <style>\
     .modal .modal-dialog { width: 80%; height: 80%, };\
    </style>\
       <div id="myModalVerificar" class="modal fade" role="dialog"><br><br><br>\
       <div class="modal-dialog">\
         <div class="modal-content">\
           <div id = "title" class="modal-header">\
             <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->\
             <h2 class="modal-title text-primary"><center>Información de la firma(S'+id+')</center></h2>\
           </div>\
           <div id = "body" class="modal-body">\
             <br>\
             <div id="Dialogo_SIGN-table"></div>\
            </div>\
            <div class="modal-footer">\
              <button type="button" id="informacion" data-dismiss="modal">Close</button>\
            </div>\
          </div>\
        </div>\
    </div>';

    InfoContentSignBDOC(id);
  
}


function ColumnsDataTableSignBDOC(){
     var columns = [
                {title: "Nombre del firmante", data: "signerCertificateSubjectName"},
                {title: "Fecha y hora de la firma", data: "signatureSigningTime"},         
                {title: "Firma válida", data: "isValid"},
                {title: "El certificado todavía está válido", data: "signerCertificateIsValid"},
                {title: "Código postal", data: function(event){ 
                                                        if(event.signaturePostalCode){
                                                            return event.signaturePostalCode;
                                                        }else{
                                                            return "Null";
                                                        }
                                                }
                },                        
                {title: "Serial del certificado del firmante", data: "signerCertificateSerial"},
                {title: "Perfil de la firma", data: "signatureProfile"},                
                {title: "Estado donde se realiza la firma", data: function(event){ 
                                                                        if(event.signatureState){
                                                                            return event.signatureState;
                                                                        }else{
                                                                            return "Null";
                                                                        }
                                                                 }
                },
                {title: "Algoritmo de firma utilizado", data: "signatureMethod"},
                {title: "Identificador de la firma", data: "signatureId"},
                {title: "Emisor del certificado firmante", data: "signerCertificateIssuer"},
                {title: "Ciudad donde se realiza la firma", data: "signatureCity"},
                {title: "Excepción de validación", data: function(event){
                                                          return "signature"+event.signatureId+"ValidationException1";
                                                        }
                },
                {title: "País donde se realiza la firma", data: function(event){
                                                                        if(event.signatureCountry){
                                                                            return event.signatureCountry;
                                                                        }else{
                                                                            return "Null";
                                                                        }
                                                                 }
                },
                {title:"Información", data: function (data){
                                                var conten = JSON.stringify(data.signatureId).split("S");                                                                                            
                                                return '<button id="informacion" type="input" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalVerificar" onclick="javascript:Dialog_SignBDOC('+parseInt(conten[1])+')">Info(<font color="red">'+data.signatureId+'</font>)</button>';
                                           } 
                }
    ];

    return columns;

}




function DataTableSignBDOC(response){

    var columns = ColumnsDataTableSignBDOC();
    var table = $("#myJsonBDOC").DataTable({    

          language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No hay resultados - Disculpe",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "search": "Buscar:", 
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "sLoadingRecords": "Cargando...",
          },
          columnDefs: [
              {"className": "dt-center", "targets": "_all"}
          ],                                  
          order: [[ 1, 'desc' ]],       
          data: response.signatures,
          columns: columns,                           
          dom: 'Bfrtip',
          columnDefs: [
              {                
                "targets": [0,2,3,4,5,6,8,9,11,12 ],
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
                      columns: [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13]
                    } 
                },
                {
                    extend:    'excelHtml5',
                    text:      'XLXS',
                    title:     'Contenido de la Firma',
                    titleAttr: 'Excel',
                    message: 'Datos de la Firma',
                    exportOptions: {
                      columns: [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13]
                    }
                },
                {
                    extend:    'csvHtml5',
                    text:      'CSV',
                    title:     'Contenido de la Firma',
                    titleAttr: 'CSV',
                    exportOptions: {
                      columns: [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13]
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
                      columns: [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13]
                    
                    }
                }                
          ]           
      });
    
    return table;

}