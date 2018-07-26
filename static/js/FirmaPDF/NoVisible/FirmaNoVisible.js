


var __PDF_DOC,
  __CURRENT_PAGE,
  __TOTAL_PAGES,
  __PAGE_RENDERING_IN_PROGRESS = 0,
  __CANVAS = $('#pdf-canvas3').get(0),
  __CANVAS_CTX = __CANVAS.getContext('2d'),
  __idd = "",
  __NUMBER = 0,
  __CLICKK = 0;

 $("#pdf-canvas3").hide();

function showPDF3(pdf_url) {
  $("#pdf-loader3").show();

  PDFJS.getDocument({ url: pdf_url }).then(function(pdf_doc) {
    __PDF_DOC = pdf_doc;
    __TOTAL_PAGES = __PDF_DOC.numPages;
    
    // Hide the pdf loader and show pdf container in HTML
    $("#pdf-loader3").hide();
    $("#pdf-contents3").show();
    $("#pdf-total-pages3").text(__TOTAL_PAGES);

    // Show the 
      showPage3(1);
  
  }).catch(function(error) {
    // If error re-show the upload button
    $("#pdf-loadere").hide();
    $("#upload-buttone").show();
    
    alert(error.message);
  });;
}

function showPage3(page_no) {
  __PAGE_RENDERING_IN_PROGRESS = 1;
  __CURRENT_PAGE = page_no;

  // Disable Prev & Next buttons while page is being loaded
  $("#pdf-next3, #pdf-prev3").attr('disabled', 'disabled');

  // While page is being rendered hide the canvas and show a loading message
  $("#pdf-canvas3").hide();
  $("#page-loader3").show();

  // Update current page in HTML
  $("#pdf-current-page3").text(page_no);
  
  
  // Fetch the page
  __PDF_DOC.getPage(page_no).then(function(page) {
    // As the canvas is of a fixed width we need to set the scale of the viewport accordingly


    var scale_required = __CANVAS.width / page.getViewport(1).width;

    // Get viewport of the page at required scale
    var viewport = page.getViewport(scale_required);

    // Set canvas height

    __CANVAS.height = viewport.height;


    var renderContext = {
      canvasContext: __CANVAS_CTX,
      viewport: viewport
    };


    // Render the page contents in the canvas
    page.render(renderContext).then(function() {
      __PAGE_RENDERING_IN_PROGRESS = 0;

      // Re-enable Prev & Next buttons
      $("#pdf-next3, #pdf-prev3").removeAttr('disabled');

      // Show the canvas and hide the page loader
      $("#page-loader3").hide();

        __idd = __CANVAS.toDataURL()
       
      var viewdimen = page.getViewport(1);
      console.log( "Width: " + viewdimen.width + ", Height: " + viewdimen.height);      

      $("#container2").attr("style", "background-image: url('"+__idd+"');background-size: cover; background-repeat: no-repeat;  height:"+viewdimen.height+"px; width:"+viewdimen.width+"px");      

    });
  });

}


// Previous page of the PDF
$("#pdf-prev3").on('click', function() {
  if(__CURRENT_PAGE != 1)
    showPage3(--__CURRENT_PAGE);
});

// Next page of the PDF
$("#pdf-next3").on('click', function() {
    
  if(__CURRENT_PAGE != __TOTAL_PAGES)
    
    showPage3(++__CURRENT_PAGE);

});



$("#Cargar_file_No_Visible").on('click', function() {
  $("#pdf-main-container").hide();
  $("#pdf-main-container2").show();  
  $("#myJsonPDF_NO_VISIBLE_wrapper").hide();
  CONTAINER2 = true;
  $("#file-to-normal").trigger('click');

});


$("#file-to-normal").on('change', function() {

  // Validate whether PDF
    if(['application/pdf'].indexOf($("#file-to-normal").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    if (__CLICKK == 0){
		$("#product-FirmaNoVisible #Lateral-derecho-NoVisible").attr("class","item-small");
		$("#product-FirmaNoVisible #icon-derecho-NoVisible").attr("class","hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a");
		$("#form-button_NoVisible").hide();
		$("#Firmar_file_NoVisible").attr("disabled","disabled");
		
        __CLICKK += 1;
    }
    else{
        $('#myJsonPDF_NO_VISIBLE_wrapper').hide();
        $('#firmar-doc-noVisible').show();
    }    

    showPDF3(URL.createObjectURL($("#file-to-normal").get(0).files[0]));


});



$("#Firmar_file_NoVisible").on('click', function(event) {
	$("#form-button_NoVisible").trigger('click');		
});




