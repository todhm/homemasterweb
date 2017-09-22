var rflag;
var rtime = 3.0;
var atime = 0;
var adjustedTime = 0.0;
var rprice = 0;
var aprice = 0;
var period = "";
window.onpageshow = function (event) {
    if (event.persisted) {
        //console.log('BFCahe로부터 복원됨');
        InitPage();
    }
    else {
        //console.log('새로 열린 페이지');
        InitPage();
    }
};
$(document).ready(function(){
	$.fn.preload = function() {
	    this.each(function(){
	        $('<img/>')[0].src = this;
	    });
	}
	var images = Array("./img/reserv/unchecked.png",
                   "./img/reserv/checked.png");
	$([images[0],images[1]]).preload();

	$("#r-calendar").hide();

/*	if($(window).width()<500){
		$("#input-date").attr("type","date");
	}*/
		
	$("#input-date").click(function(){
		//if($(window).width()>500)
			$("#r-calendar").show();
	});

	$("#input-date-addon").click(function(){
		//if($(window).width()>500)
			$("#r-calendar").show();
	});

	$(".counter-button").click(function(){
		if($(this).hasClass("disabled")){
		}else{
			var counter_root = $(this).parent();
			var value = $(counter_root).children(".counter-label").children(".countnum");
			var tempval = parseFloat($(value).text());
			if($(this).hasClass("left") && !$(this).hasClass("disabled")){
				if($(this).hasClass("counter-button-time")){
					adjustedTime -= 0.5;
				}else{
					tempval -= 1.0;	
				}
				// Left 버튼 한계 컨트롤
				if(tempval < 1.1 && !$(this).hasClass("counter-button-time")){
					$(counter_root).children(".left").addClass("disabled");
				}
				else if(adjustedTime < 0.5 && $(this).hasClass("counter-button-time")){
					$(counter_root).children(".left").addClass("disabled");
				}

				// Right 버튼 한계 컨트롤
				if(!$(this).hasClass("counter-button-time")){
					// 방은 최대 6개
					if(tempval < 6 && counter_root.attr('id')=='bdroom-control'){
						$(counter_root).children(".right").removeClass("disabled");
					}
					// 화장실은 최대 3개
					else if(tempval < 3 && counter_root.attr('id')=='baroom-control'){
						$(counter_root).children(".right").removeClass("disabled");
					}
				}
				$(value).text(tempval);
				CalcTimePrice();
			}
			else if($(this).hasClass("right")){
				if($(this).hasClass("counter-button-time")){
					adjustedTime += 0.5;
				}else{
					tempval += 1.0;	
				}
				// Left 버튼 한계 컨트롤
				if(tempval > 1 && !$(this).hasClass("counter-button-time")){
					$(counter_root).children(".left").removeClass("disabled");
				}
				else if(adjustedTime > 0 && $(this).hasClass("counter-button-time")){
					$(counter_root).children(".left").removeClass("disabled");
				}

				// Right 버튼 한계 컨트롤
				if(!$(this).hasClass("counter-button-time")){
					// 방은 최대 6개
					if(tempval > 5.9 && counter_root.attr('id')=='bdroom-control'){
						$(counter_root).children(".right").addClass("disabled");
					}
					// 화장실은 최대 3개
					else if(tempval > 2.9 && counter_root.attr('id')=='baroom-control'){
						$(counter_root).children(".right").addClass("disabled");
					}
				}
				$(value).text(tempval);
				CalcTimePrice();
			}
		}	
	});

	$("#select-ctype").change(function(){
		adjustedTime = 0.0;
		CalcTimePrice();
	});
	// $("input[name=dtype]").change(function(){
	// 	adjustedTime = 0.0;
	// 	CalcTimePrice();
	// });
	$("input[name=addreq]").change(function(){
		adjustedTime = 0.0;
		CalcAddReq($(this));
	});

	$("#value-agree").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
		}else{
			$(this).addClass("checked");
		}
	});

	$("#btn-floating").click(function(){
		collectData();
	});

	$("#btn_ok").click(function(){
		$("#weekendReservModal").modal('hide');
	});

	$(window).scroll(function(){
		var scrollBottom = $(window).scrollTop() + $(window).height() - 300;
		var reception_top = $("#div-reception").position().top;
		if($(window).width()>768){
			if(scrollBottom > reception_top){
				$("#floating-info").slideUp("slow");
			}
			else{
				$("#floating-info").slideDown("slow");
			}
		}
	});

});
function InitPage(){
	openWin('weekendReservModal');
	rflag = sessionStorage.getItem('t');
	$('html, body').animate({'scrollTop' : 0});
	$("#div-title").removeClass();
	kCalendar('r-calendar');
	if(rflag=='1'){
		$("#div-regular-date").remove();
		$("#div-title").addClass("title-once");
		$("#div-title p").text("한 번만 서비스 신청하기");
		$("#div-date").children('h3').text("클리닝 받고 싶은 날짜를 선택해주세요");
		$("#div-calc").children('h3').text("한 번만 클리닝 예상 견적 입니다");
		$("#div-total-price-value").children('h2').text("45000원");
		$("#div-base-price-value").children('h2').text("45000원");
		rprice = 45000;
		rtime = 3.0;
		$('#input-date').val('');
		
	}else if(rflag=='2'){
		$("#div-title").addClass("title-regular");
		$("#div-title p").text("정기 클리닝 신청하기");
		if(sessionStorage.getItem('per') == "매주여러번"){
			$("#div-regular-date").show();
			$("input[name=date]").attr("type","checkbox");
			$('input:checkbox[name=date]').attr('checked',false);
			$("#div-date").children('h3').text("클리닝 받고 싶은 요일,시간을 선택해주세요");
		}
		else{
			$("#div-regular-date").remove();
			$("input[name=date]").attr("type","radio");
			$('input:radio[name=date]').attr('checked',false);
			$("#div-date").children('h3').text("클리닝 시작 날짜를 선택해주세요");
		}
		$("#div-calc").children('h3').text("정기 클리닝 예상 견적 입니다");
		$("#div-total-price-value").children('h2').text("42000원");
		$("#div-base-price-value").children('h2').text("42000원");
		$("#floating-total-price").text("42000원");
		$("#floating-base-price").text("42000원");
		rprice = 42000;
		rtime = 3.0;
		$('#input-date').val('');
	}
	// 나머지 정보 모두 초기화
	$('#select-time').each(function(){
	    $(this).find('option:first').attr('selected','true');
	});
	$('input:checkbox[name=addreq]').attr('checked',false);
	//$("input:radio[name=dtype]:first").attr('checked', true);
	$('#select-ctype').each(function(){
	    $(this).find('option:first').attr('selected','true');
	});
}

function collectData(){
	var rdate;
	if($("#input-date").val() == ""){
		alert("클리닝 날짜를 선택해 주세요.");
		$("#input-date").focus();
		return false;
	}
	var tempdate = $("#input-date").val().split(" ");

	var datey = tempdate[0].split("년");
	var datem = tempdate[1].split("월");
	var dated = tempdate[2].split("일");
	if(parseInt(dated[0])<10 && parseInt(dated[0])>0){
		dated[0] = "0"+dated[0];
	}
	tempdate = datey[0]+datem[0]+dated[0];
	if(rflag == '1'){
		rdate = tempdate;
	}
	else if(rflag=='2'){
		var tempresdate = "";
		var resdatetext ="";
		var ttd  = '\''+datey[0]+'-'+datem[0]+'-'+dated[0]+'\'';
		var tempday = parseDate(ttd);
		period = sessionStorage.getItem('per');
		if(period == "매주여러번"){	
		    $("input[name=date]:checked").each(function(index, element){
		    	tempresdate += $(element).val();
		    	if(index != $("input[name=date]:checked").length -1){
		    		tempresdate +=",";
		    	}
		    });
		    resdatetext = tempdate+','+tempresdate;
		}
		else{
			if(tempday.getDay() == 0)
				resdatetext = tempdate+",일";
			else if(tempday.getDay() == 1)
				resdatetext = tempdate+",월";
			else if(tempday.getDay() == 2)
				resdatetext = tempdate+",화";
			else if(tempday.getDay() == 3)
				resdatetext = tempdate+",수";
			else if(tempday.getDay() == 4)
				resdatetext = tempdate+",목";
			else if(tempday.getDay() == 5)
				resdatetext = tempdate+",금";
			else if(tempday.getDay() == 6)
				resdatetext = tempdate+",토";
			else
				resdatetext = tempdate+ ", " +tempday.getDay();
		}
	    rdate = resdatetext;
	}
	if(rdate == ""){
		alert("클리닝 날짜를 선택해 주세요.");
		$("#input-date").val('');
		$("#input-date").focus();
		return false;
	}
	console.log(rdate);
	var reserv_cleaning_time = $("#select-time").val();
    var size = $("#select-ctype").val(); // 평수
    var dirty = 0; // 0: 보통, 1: 더러워요
    var addreqtext = ""; // 추가사항 TXT
    $("input[name=addreq]:checked").each(function(index, element){
    	addreqtext += $(element).val();
    	if(index != $("input[name=addreq]:checked").length -1){
    		addreqtext +=",";
    	}
    });
 	if(rflag == '1'){
 		period = "1회"
 	}
 	var ttime = (rtime + atime + adjustedTime) * 60;
 	var basic_time = (rtime + adjustedTime) * 60;
 	var bdroom = $("#bdroom-control").find('.countnum').text();
	var baroom = $("#baroom-control").find('.countnum').text();
	var tprice = rprice + aprice;
 	var ritems = {'dates':rdate,'time':reserv_cleaning_time,'size':size, 'dirty':dirty, 'period':period,'total_duration':ttime,'basic_duration':basic_time,'tasks':addreqtext,'rooms':bdroom,'baths':baroom,'total_price':tprice,'basic_price':rprice};
 	if(!$("#value-agree").hasClass("checked")){
		alert("주의사항에 동의해 주세요.");
		$("#value-agree").focus();
		window.scrollTo(0,document.body.scrollHeight);
		return false;
	}
	//console.log(ritems);
	sessionStorage.setItem('sd', JSON.stringify(ritems));
	location.href="./reserv_info.html";
}

function CalcTimePrice(){
	var hsize = $("#select-ctype").val();
	var bdroom = $("#bdroom-control").find('.countnum').text();
	var baroom = $("#baroom-control").find('.countnum').text();
	//var dirty = $("input[name=dtype]:checked").val();
	var dirty = 0;

	if(hsize < 20){
		if(dirty == '0'){
			rtime = 3.0;
			var bdat = parseInt(bdroom) - 2;
			var baat = parseInt(baroom) - 1;
			if(bdat > 0){
				rtime = rtime + (bdat * 0.5);
			}
			if(baat > 0){
				rtime = rtime + (baat * 0.5);
			}
		}
		else if(dirty == '1'){
			rtime = 5.0;
			var bdat = parseInt(bdroom) - 2;
			var baat = parseInt(baroom) - 1;
			if(bdat > 0){
				rtime = rtime + (bdat * 0.5);
			}
			if(baat > 0){
				rtime = rtime + (baat * 1);
			}
		}
	}
	else if(hsize >= 20 && hsize < 40){
		if(dirty == '0'){
			rtime = 4.0;
			var bdat = parseInt(bdroom) - 3;
			var baat = parseInt(baroom) - 2;
			if(bdat > 0){
				rtime = rtime + (bdat * 0.5);
			}
			if(baat > 0){
				rtime = rtime + (baat * 0.5);
			}
		}
		else if(dirty == '1'){
			rtime = 6.0;
			var bdat = parseInt(bdroom) - 3;
			var baat = parseInt(baroom) - 2;
			if(bdat > 0){
				rtime = rtime + (bdat * 0.5);
			}
			if(baat > 0){
				rtime = rtime + (baat * 1);
			}
		}
	}
	else if(hsize > 40){
		if(dirty == '0'){
			rtime = 5.0;
			var bdat = parseInt(bdroom) - 4;
			var baat = parseInt(baroom) - 2;
			if(bdat > 0){
				rtime = rtime + (bdat * 0.5);
			}
			if(baat > 0){
				rtime = rtime + (baat * 0.5);
			}
		}
		else if(dirty == '1'){
			rtime = 7.0;
			var bdat = parseInt(bdroom) - 4;
			var baat = parseInt(baroom) - 2;
			if(bdat > 0){
				rtime = rtime + (bdat * 0.5);
			}
			if(baat > 0){
				rtime = rtime + (baat * 1);
			}
		}
	}

	if(rflag == '1'){
		rprice = (rtime+adjustedTime) * 15000;
	}
	else if(rflag == '2'){
		if(bdat <= 0 && baat <=0 && (hsize >= 20 && hsize < 40) && dirty == '0' && adjustedTime<0.1){
			rprice = 55000;
		}else{
			rprice = (rtime+adjustedTime) * 14000;
		}
	}
	var tprice = rprice + aprice;
	var ttime = rtime + atime + adjustedTime;
	$("#div-recommended-time").find('.countnum').text(ttime);
	$("#floating-ttime-control").find('.countnum').text(ttime);
	if(adjustedTime < 0.1){
		$("#div-recommended-time").find('.left').addClass('disabled');
		$("#floating-ttime-control").find('.left').addClass('disabled');
	}
	else{
		$("#div-recommended-time").find('.left').removeClass('disabled');
		$("#floating-ttime-control").find('.left').removeClass('disabled');
	}
	$("#div-total-price-value").children('h2').text(tprice + "원");
	$("#div-base-price-value").children('h2').text(rprice + "원");
	$("#div-add-price-value").children('h2').text(aprice + "원");
	$("#floating-total-price").text(tprice + "원");
	$("#floating-base-price").text(rprice + "원");
	$("#floating-add-price").text(aprice + "원");

	// adjusttime = 0 일때, (추천) 표시 뜨도록.
	if(adjustedTime == 0.0){
		$("#div-recommended-time").find('.recom-text').show();
		$("#floating-time").find('.recom-text').show();
	}else{
		$("#div-recommended-time").find('.recom-text').hide();
		$("#floating-time").find('.recom-text').hide();
	}
}

function CalcAddReq(element){
	if($(element).prop("checked")){
		if($(element).val() == "빨래"){
			aprice += 0;
			atime += 0;
		}
		else if($(element).val() == "단문형냉장고"){
			aprice += 30000;
			atime += 2.0;
		}
		else if($(element).val() == "양문형냉장고"){
			aprice += 45000;
			atime += 3.0;
		}
		else{
			return false;
		}
	}else{
		if($(element).val() == "빨래"){
			aprice -= 0;
			atime -= 0;
		}
		else if($(element).val() == "단문형냉장고"){
			aprice -= 30000;
			atime -= 2.0;
		}
		else if($(element).val() == "양문형냉장고"){
			aprice -= 45000;
			atime -= 3.0;
		}
		else{
			return false;
		}
	}

	CalcTimePrice();
}
/** 날짜 파싱 함수 **/
function parseDate(strDate) {
	var _strDate = strDate;
	var _dateObj = new Date(_strDate);
	if (_dateObj.toString() == 'Invalid Date') {
		_strDate = _strDate.split('.').join('-');
		_dateObj = new Date(_strDate);
	}
	if (_dateObj.toString() == 'Invalid Date') {
		var _parts = _strDate.split(' ');

		var _dateParts = _parts[0];
		_dateObj = new Date(_dateParts);

		if (_parts.length > 1) {
			var _timeParts = _parts[1].split(':');
			_dateObj.setHours(_timeParts[0]);
			_dateObj.setMinutes(_timeParts[1]);
			if (_timeParts.length > 2) {
				_dateObj.setSeconds(_timeParts[2]);
			}
		}
	}

	return _dateObj;
}

/******  쿠키 관리 함수  *******/
//쿠키 창열기    
function openWin( winName ) {  
   var blnCookie    = getCookie( winName );  
   var modaltarget = document.getElementById(winName);
   if( !blnCookie ) {  
       $(modaltarget).modal('show');
   }  
}  
  
// 창닫기  
function closeWin(winName, expiredays) {   
   setCookie( winName, "done" , expiredays); 
   var modaltarget = document.getElementById(winName);  
   $(modaltarget).modal('hide');
}  

// 쿠키 가져오기  
function getCookie( name ) {  
   var nameOfCookie = name + "=";  
   var x = 0;  
   while ( x <= document.cookie.length )  
   {  
       var y = (x+nameOfCookie.length);  
       if ( document.cookie.substring( x, y ) == nameOfCookie ) {  
           if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )  
               endOfCookie = document.cookie.length;  
           return unescape( document.cookie.substring( y, endOfCookie ) );  
       }  
       x = document.cookie.indexOf( " ", x ) + 1;  
       if ( x == 0 )  
           break;  
   }  
   return "";  
}  
  
// 24시간 기준 쿠키 설정하기  
// expiredays 후의 클릭한 시간까지 쿠키 설정  
function setCookie( name, value, expiredays ) {   
   var todayDate = new Date();   
   todayDate.setDate( todayDate.getDate() + expiredays );   
   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
} 