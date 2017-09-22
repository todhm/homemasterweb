var ritem;
$(document).ready(function(){
	//바로 접근 방지
	if(!sessionStorage.getItem('sd')){
		location.replace("./nreserv.html");
	}

	if(sessionStorage.getItem('t')=='1'){
		$("#div-title").removeClass();
		$("#div-title").addClass("title-once");
		$("#div-title p").text("한 번만 서비스 신청하기");
	}else if(sessionStorage.getItem('t')=='2'){
		$("#div-title").removeClass();
		$("#div-title").addClass("title-regular");
		$("#div-title p").text("정기 클리닝 신청하기");
	}
	$(".right2").hide();
	$(".right3").hide();
	$(".right4").hide();
	$("input:radio[name=area]:first").attr('checked', true);
	$('#kind_address').each(function(){
        $(this).find('option:first').attr('selected','true');
    });
	$(".address-item").click(function(){
        if($(this).attr("for")=="area-0"){
            $("#div-kind-address").show();
        }
        else{
            $("#div-kind-address").hide();
        }
    });

	$("#r-tel").keyup(function(){
		if($(this).val().length < 11 || $(this).val().length > 11){
			$(this).css({"background-color":"#ffeeef"});
			$(this).closest(".info-div").addClass("has-error");
			$(".right2 img").prop("src","./img/reserv/ic-error.png");
			$(".right2").show();
		}else if($(this).val().length == 11){
			$(this).css({"background-color":"#fff"});
			$(this).closest(".info-div").removeClass("has-error");
			$(".right2 img").prop("src","./img/reserv/ic-selected.png");
			$(".right2").show();
		}
	});

	$("#r-password").keyup(function(){
		CheckPWVaild();
	});

	$("#r-cpassword").keyup(function(){
		CheckPWVaild();
	});

	ritem = JSON.parse(sessionStorage.getItem('sd'));
	sessionStorage.removeItem('sd');
	GetActiveEventsQuery();
});

function CheckPWVaild(){
	var pw1 = $("#r-password").val();
	var pw2 = $("#r-cpassword").val();

	if(pw1.length < 6){
		$("#r-password").css({"background-color":"#ffeeef"});
		$("#r-password").parent().removeClass("has-success");
		$("#r-password").parent().addClass("has-error");
		$(".right3 img").prop("src","./img/reserv/ic-error.png");
		$(".right3").show();
	}
	else if(pw1.length >= 6){
		$("#r-password").css({"background-color":"transparent"});
		$("#r-password").parent().removeClass("has-error");
		$(".right3 img").prop("src","./img/reserv/ic-selected.png");
		$(".right3").show();
	}
	if(pw1 != ""){
		if(pw2 != pw1){
			$("#r-cpassword").css({"background-color":"#ffeeef"});
			$("#r-cpassword").parent().removeClass("has-success");
			$("#r-cpassword").parent().addClass("has-error");
			$(".right4 img").prop("src","./img/reserv/ic-error.png");
			$(".right4").show();
			return false;
		}else{
			$("#r-cpassword").css({"background-color":"transparent"});
			$("#r-cpassword").parent().removeClass("has-error");
			$(".right4 img").prop("src","./img/reserv/ic-selected.png");
			$(".right4").show();
			return true
		}
	}
}

function SubmitData(){
	if($("#r-name").val()==""){
		alert("고객님 성함을 입력해 주세요.");
		$("#r-name").focus();
		return false;
	}
	else if($("#r-address").val()==""){
		alert("고객님 주소를 입력해 주세요.");
		$("#r-address").focus();
		return false;
	}
	else if($("#r-tel").val()==""){
		alert("고객님 연락처를 입력해 주세요.");
		$("#r-tel").focus();
		return false;
	}
	else if($("#r-password").val()==""){
		alert("비밀번호를 입력해 주세요.");
		$("#r-password").focus();
		return false;
	}
	else if($("#r-cpassword").val()==""){
		alert("입력하신 비밀번호를 한번 더 입력해 주세요.");
		$("#r-cpassword").focus();
		return false;
	}
	else if(!CheckPWVaild()){
		alert("입력하신 비밀번호를 한번 더 입력해 주세요.");
		$("#r-cpassword").focus();
		return false;
	}
	var name = $("#r-name").val();
	var phone = $("#r-tel").val();
	var tempadd;
	if($("input:radio[name=area]:checked").val() == '0'){
		tempadd = "서울특별시 "+$("#kind_address").val()+" ";
	}else{
		tempadd = "경기도 성남시 분당구 ";
	}
	var address = tempadd + $("#r-address").val();
	var message = $("#r-reqest").val();
	var password = $("#r-password").val();

	var submitdata = {'dates':ritem.dates,
                    'aptype':ritem.aptype,
					'time':ritem.time,
					'size':ritem.size,
					'dirty':ritem.dirty,
					'period':ritem.period,
					'total_duration':ritem.total_duration,
					'basic_duration':ritem.basic_duration,
					'tasks':ritem.tasks,
					'rooms':ritem.rooms,
					'baths':ritem.baths,
					'total_price':ritem.total_price,
					'basic_price':ritem.basic_price,
					'additional_price':ritem.additional_price,
 				    'adjusted_price':ritem.adjusted_price,
					'name':name,
					'phone':phone,
					'address':address,
					'message':message,
					'password':password};
    console.log(submitdata);
	ConfirmNewCleaningQuery(submitdata);
}
