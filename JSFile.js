$(document).ready(function () {
$('#imageLink').val('');
function showLoaderInternal(divselector, isvisible) {
     if (isvisible) {
         $('.internalTemplateLoader').remove();
         $(divselector).append($('#templateCustomLoader').html());
		 $('.internalTemplateLoader').css({'height': $(divselector).height(), 'position':'absolute', top:10});
         $('.loader').css({'height': ($(divselector).height()/2),'width': ($(divselector).height()/2), 'position':'absolute', 'top': 10,left:(window.innerWidth/2 - $(divselector).height()/4 -16) });
     }
     else {
         $('.internalTemplateLoader').fadeOut(500, function () { $(this).remove(); });
     }
 }

function testLink(s){
 var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
 return regexp.test(s);
}

function ifImageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }
function validateImageURL(url){
	var ifFalse;
      ifImageExists(url, function(ifExists) {
        if (ifExists == true){
			
			$('#imageFrame').append(' <img class="imgLinkData" src="'+url+'" />');
			$('#imageFrame').append('<div class="initImgLoading"></div>');
			$('#imageFrame').css({'max-height':(window.innerHeight - $('#taskDiv').height()-28), 'max-width':(window.innerWidth)}) ;
			$('.imgLinkData').css({'max-height':($('#imageFrame').height()), 'max-width':($('#imageFrame').width())}) ;
			$('.loader').css({'height': ($(".imgLinkData").height()/2),'width': ($(".imgLinkData").height()/2), 'position':'absolute', 'top': 10,left:(window.innerWidth/2 - $(".imgLinkData").height()/4 - 16) });
			$(".initImgLoading").css({'backgroundColor':'#fff', width:($(".imgLinkData").width()), height:($(".imgLinkData").height()), 'position':'absolute', top:10, left:($('.imgLinkData').position().left)})
			showLoaderInternal('#imageFrame', false);
			animateImgLoad();
		}
		else{
			showLoaderInternal('#imageFrame', false);
			$('#imageFrame').append('<div class="imgLinkData" style="color:#FF0000"> No image found at URL link</div>');
		}
      });
    }
	
var ifTextChanged=false;
	
$('#imageLink').change(function(){
	ifTextChanged = true;
})
	
function animateImgLoad(){
	if($(".initImgLoading").width() > 0){
		setTimeout(function(){
			$(".initImgLoading").css({width:($(".initImgLoading").width() - 2), height:($(".initImgLoading").height() - 2), top:($('.initImgLoading').position().top + 1), left:($('.initImgLoading').position().left + 1)})
			animateImgLoad();
		},50);
	}
}

$('#submitButton').click(function(){
	if (!$('#imageLink').val() || $('#imageLink').val().trim()==''){
		$('.imgLinkData').remove();		
		$('#imageFrame').append('<div class="imgLinkData" style="color:#FF0000"> Image link is mandatory</div>');
		$('#imageLink').focus();
		}

	else{
	if(ifTextChanged){
		$('.imgLinkData').remove();		
		var url = $('#imageLink').val().trim().toLowerCase();
		
		if (!testLink(url)){
			$('#imageFrame').append('<div class="imgLinkData" style="color:#FF0000"> Invalid URL link</div>');
		}
		else{
			showLoaderInternal('#imageFrame', true);
			validateImageURL(url);
		}
		ifTextChanged=false;
	}
	
	}
	})

})