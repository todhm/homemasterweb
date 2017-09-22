/*test host      : http://192.168.0.114:8888
server host  : https://homemaster-service.com*/
//var getAPIURL = "http://192.168.0.114:8888";
var getAPIURL = "https://homemaster-service.com";
/*
$.ajax(function(){
	method:"POST",
	url:url,
	data:data,
	dataType :"json",
	statusCode:{
		// Success
		100: function() {

		}
	}
});
*/

function SubmitOfficeRequestQuery(data){
	$.ajax({
		type:"POST",
		url: getAPIURL + "/inquery_office",
		data:data,
		dataType :"json",
		beforeSend:function(){
			$.spin('true');
		},
		success: function (msg) {//On Successfull service call
	        if(msg.response==""){
	        	if(msg.err_msg != ""){
		    		alert(msg.err_msg);
		    	}
		    }
		    else{

		    	$.spin('false');

		    	//네이버 전환 추적
				var _nasa={};
				_nasa["cnv"] = wcs.cnv("4","3"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
				//<!-- 공통 적용 스크립트 , 모든 페이지에 노출되도록 설치. 단 전환페이지 설정값보다 항상 하단에 위치해야함 -->
				if (!wcs_add) var wcs_add={};
				wcs_add["wa"] = "s_1f37edab531";
				if (!_nasa) var _nasa={};
				wcs.inflow();
				wcs_do(_nasa);

				// Google Tag Manager : 상품구매 - 오피스클리닝
		    	dataLayer.push({'event':'purchase','eventCategory':'상품구매','eventAction':'오피스클리닝',
				  'ecommerce': {
				    'purchase': {
				      'actionField': {
				        'id': 'office00',          // Transaction ID. Required for purchases and refunds.
				        'revenue': '1',                     // Total transaction value (incl. tax and shipping)
				      },
				      'products': [{                            // List of productFieldObjects.
				        'name': '오피스클리닝',     // Name or ID is required.
				        'id': '5',
				        'price': '1',
				        'quantity': 1,
				       }]
				    }
				  }
				});
				//FB 오피스 클리닝 접수
				fbq('track', 'Purchase', {value: "1", currency: 'KRW'});
		    	alert("접수가 성공적으로 되었습니다.")
		    	location.href = "./office.html";
		    }
	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}
function SubmitHireRequestQuery(data){
	$.ajax({
		type:"POST",
		url: getAPIURL + "/apply_homemaster",
		data:data,
		dataType :"json",
		beforeSend:function(){
			$.spin('true');
		},
		success: function (msg) {//On Successfull service call
	        if(msg.response==""){
	        	if(msg.err_msg != ""){
		    		alert(msg.err_msg);
		    	}
		    }
		    else{
		    	$.spin('false');
		    	  var _nasa={};
				  _nasa["cnv"] = wcs.cnv("2","3"); // 전환유형, 전환가치 설정해야함. 설치매뉴얼 참고
				  //<!-- 공통 적용 스크립트 , 모든 페이지에 노출되도록 설치. 단 전환페이지 설정값보다 항상 하단에 위치해야함 -->
				  if (!wcs_add) var wcs_add={};
				  wcs_add["wa"] = "s_1f37edab531";
				  if (!_nasa) var _nasa={};
				  wcs.inflow();
				  wcs_do(_nasa);
				  // Google Tag Manager : 회원가입 - 홈마스터 지원
		    	dataLayer.push({'event':'regist', 'eventCategory': '회원가입', 'eventAction' : '홈마스터', 'eventLabel': ''});
		    	alert("접수가 성공적으로 되었습니다.")
		    	location.href = "./hire.html";
		    }
	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}
function GetActiveEventsQuery(){
	$.ajax({
		type:"GET",
		url: getAPIURL + "/get_active_events",
		success: function (msg) {//On Successfull service call
	    	var temptxt ="";
	    	for(var i=0;i<msg.response.length;i++){
	    		temptxt += "<div id='row-banner"+(i)+"' class='row-banner'><a href='"+msg.response[i].link+"?route=web'></a></div>"
	    	}
	    	console.log(msg);
	    	console.log(temptxt);
	    	$("#div-row-banner").append(temptxt);
	    	for(var i=0;i<msg.response.length;i++){
	    		$("#row-banner"+(i)).css("background-image","url("+msg.response[i].image_url_web+")");
	    		$("#div-event-banner-page"+i).css("background-image","url("+msg.response[i].image_url_web+")");
	    		$("#div-event-banner-page"+i).append("<a href='"+msg.response[i].link+"?route=web'></a>");
	    	}

	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}

/**
 * date : 2016-11-17
 * description : Confirm a reservation in renewal web process
 * param: data
 * datatype: JSON
 **/
function ConfirmNewCleaningQuery(data){
	$.ajax({
		type:"POST",
		url: getAPIURL + "/request_cleaning",
		data:data,
		dataType :"json",
		beforeSend: function(){
			sessionStorage.setItem('dates', data.dates);
			sessionStorage.setItem('per', data.period);
			sessionStorage.setItem('p', data.total_price);
			sessionStorage.setItem('add', data.address);
			sessionStorage.setItem('bdr', data.rooms);
			sessionStorage.setItem('btr', data.baths);
			sessionStorage.setItem('addreq', data.tasks);
		},
		success: function (msg) {//On Successfull service call
	        if(msg.response==""){
		       	if(msg.err_msg != ""){
		    		alert(msg.err_msg);
		    	}
		    }
		    else{
		    	var dateItem = msg.response;
		    	// Google Tag Manager : 회원가입 - 일반사용자
		    	dataLayer.push({'event':'regist', 'eventCategory': '회원가입', 'eventAction' : '일반사용자', 'eventLabel': ''});
		    	// Google Tag Manager : 서비스신청
		    	dataLayer.push({'event':'lead', 'eventCategory': '서비스신청', 'eventAction' : sessionStorage.getItem('add'), 'eventLabel': "횟수: "+sessionStorage.getItem('per')+" 방: "+sessionStorage.getItem('bdr')+" 화장실: "+sessionStorage.getItem('btr')+" "+sessionStorage.getItem('addreq')});
				sessionStorage.setItem('dtI', dateItem);
		    	sessionStorage.removeItem('add');
		    	sessionStorage.removeItem('bdr');
		    	sessionStorage.removeItem('btr');
		    	sessionStorage.removeItem('addreq');
		    	location.replace("./npayment.html");
		    }
	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}
/**
 * date : 2016-11-17
 * description : Select a payment way
 * param: data
 * datatype: JSON
 **/
function SelectPaymentWayQuery(data){
	$.ajax({
		type:"POST",
		url: getAPIURL + "/select_payment_method",
		data:data,
		dataType :"json",
		beforeSend:function(){
			sessionStorage.setItem('pway',data.payment);
		},
		success: function (msg) {//On Successfull service call
	        if(msg.response==""){
		       	if(msg.err_msg != ""){
		    		alert(msg.err_msg);
		    	}
		    }
		    else{
		    	if(sessionStorage.getItem('pway')=='현장결제'){
		    		location.href="./success.html"

		    	}else if(sessionStorage.getItem('pway')=='지금결제'){
		    		location.href="./cardinfo.html";
		    	}
		    }
	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}
/**
 * date : 2016-11-18
 * description : Pay the cleaning fare with credit card
 * param: data
 * datatype: JSON
 **/
function PayCleaningQuery(data){
	$.ajax({
		type:"POST",
		url: getAPIURL + "/register_and_charge",
		data:data,
		dataType :"json",
		beforeSend:function(){
			$.spin('true');
		},
		success: function (msg) {//On Successfull service call
			$.spin('false');
			console.log(msg);
	        if(msg.response==""){
		       	if(msg.err_msg != ""){
		    		alert(msg.err_msg);
		    	}
		    }
		    else{
		    	fbq('track', 'AddPaymentInfo');
		    	alert("결제가 완료되었습니다.");
		    	location.replace('./success.html');
		    }
	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}
/**
 * date : 2016-11-19
 * description : Get the All Information of Cleaning with Phone Number and Password of it
 * param: data
 * datatype: JSON
 **/
function GetCleaningListQuery(data){
	$.ajax({
		type:"GET",
		url: getAPIURL + "/check_my_cleaning",
		data:data,
		dataType :"json",
		success: function (msg) {//On Successfull service call
			console.log(msg);
	        if(msg.response==""){
		       	if(msg.err_msg != ""){
		    		alert(msg.err_msg);
		    	}
		    }
		    else{
		    	sessionStorage.setItem("clist",JSON.stringify(msg.response));
		    	console.log(msg.response);
		    	location.href="./cleanings.html";
		    }
	    },
	    error: function(msg){
	    	console.log("Query Fail");
	    }
	});
}
