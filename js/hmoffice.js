$(document).ready(function(){
	InitPage();

	$(".jumper").on("click", function( e ) {

	    e.preventDefault();

	    $("body, html").animate({
	        scrollTop: $( $(this).attr('href') ).offset().top -70
	    }, 600);

	});
});

function InitPage(){
	$("#off-cname").val("");
	$("#off-add").val("");
	$("#off-rname").val("");
	$("#off-tel").val("");
}

function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode != 46 && charCode != 45 && charCode > 31
    && (charCode < 48 || charCode > 57))
     return false;

  return true;
}
 /* 한글입력 방지 */
function fn_press_han(obj)
{
    //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
    if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
    || event.keyCode == 46 ) return;
    //obj.value = obj.value.replace(/[\a-zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
}

function SubmitOfficeRequest(){
	var cname = $("#off-cname").val();
	var rname = $("#off-rname").val();
	var ttel = $("#off-tel").val().split("-");
	var tel ="";
	for(var i=0; i<ttel.length; i++){
		tel += ttel[i];
	}

	if(cname ==''){
		alert("상호명을 입력해 주세요.");
		return false;
	}

	else if(rname ==''){
		alert("예약하시는 분의 성함을 입력해 주세요.");
		return false;
	}
	else if(tel ==''){
		alert("연락 가능한 번호를 입력해 주세요.");
		return false;
	}
	else if(tel.length > 11){
		alert("올바른 연락처를 입력해 주세요.");
		return false;
	}


	var data = {'corp_name':cname, 'reserve_name':rname, 'phone':tel};
    console.log(data);
	SubmitOfficeRequestQuery(data);
}
(function($) {
  $.extend({
    spin: function(spin, opts) {

      if (opts === undefined) {
        opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 30, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#4096ff', // #rgb or #rrggbb or array of colors
          speed: 1, // Rounds per second
          trail: 56, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };
      }

      var data = $('body').data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
        $("#spinner_modal").remove();
        return this;
      }

      if (spin) {

        var spinElem = this;

        $('body').append('<div id="spinner_modal" style="background-color: rgba(0, 0, 0, 0.3); width:100%; height:100%; position:fixed; top:0px; left:0px; z-index:' + (opts.zIndex - 1) + '"/>');
        spinElem = $("#spinner_modal")[0];

        data.spinner = new Spinner($.extend({
          color: $('body').css('color')
        }, opts)).spin(spinElem);
      }

    }
  });
})(jQuery);
