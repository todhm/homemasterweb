function CheckPWVaild(){var a=$("#r-password").val(),b=$("#r-cpassword").val();if(a.length<6?($("#r-password").css({"background-color":"#ffeeef"}),$("#r-password").parent().removeClass("has-success"),$("#r-password").parent().addClass("has-error"),$(".right3 img").prop("src","./img/reserv/ic-error.png"),$(".right3").show()):a.length>=6&&($("#r-password").css({"background-color":"transparent"}),$("#r-password").parent().removeClass("has-error"),$(".right3 img").prop("src","./img/reserv/ic-selected.png"),$(".right3").show()),""!=a)return b!=a?($("#r-cpassword").css({"background-color":"#ffeeef"}),$("#r-cpassword").parent().removeClass("has-success"),$("#r-cpassword").parent().addClass("has-error"),$(".right4 img").prop("src","./img/reserv/ic-error.png"),$(".right4").show(),!1):($("#r-cpassword").css({"background-color":"transparent"}),$("#r-cpassword").parent().removeClass("has-error"),$(".right4 img").prop("src","./img/reserv/ic-selected.png"),$(".right4").show(),!0)}function SubmitData(){if(""==$("#r-name").val())return alert("고객님 성함을 입력해 주세요."),$("#r-name").focus(),!1;if(""==$("#r-address").val())return alert("고객님 주소를 입력해 주세요."),$("#r-address").focus(),!1;if(""==$("#r-tel").val())return alert("고객님 연락처를 입력해 주세요."),$("#r-tel").focus(),!1;if(""==$("#r-password").val())return alert("비밀번호를 입력해 주세요."),$("#r-password").focus(),!1;if(""==$("#r-cpassword").val())return alert("입력하신 비밀번호를 한번 더 입력해 주세요."),$("#r-cpassword").focus(),!1;if(!CheckPWVaild())return alert("입력하신 비밀번호를 한번 더 입력해 주세요."),$("#r-cpassword").focus(),!1;var c,a=$("#r-name").val(),b=$("#r-tel").val();c="0"==$("input:radio[name=area]:checked").val()?"서울특별시 "+$("#kind_address").val()+" ":"경기도 성남시 분당구 ";var d=c+$("#r-address").val(),e=$("#r-reqest").val(),f=$("#r-password").val(),g={dates:ritem.dates,time:ritem.time,size:ritem.size,dirty:ritem.dirty,period:ritem.period,total_duration:ritem.total_duration,basic_duration:ritem.basic_duration,tasks:ritem.tasks,rooms:ritem.rooms,baths:ritem.baths,total_price:ritem.total_price,basic_price:ritem.basic_price,additional_price:ritem.additional_price,adjusted_price:ritem.adjusted_price,name:a,phone:b,address:d,message:e,password:f};ConfirmNewCleaningQuery(g)}var ritem;$(document).ready(function(){sessionStorage.getItem("sd")||location.replace("./nreserv.html"),"1"==sessionStorage.getItem("t")?($("#div-title").removeClass(),$("#div-title").addClass("title-once"),$("#div-title p").text("한 번만 서비스 신청하기")):"2"==sessionStorage.getItem("t")&&($("#div-title").removeClass(),$("#div-title").addClass("title-regular"),$("#div-title p").text("정기 클리닝 신청하기")),$(".right2").hide(),$(".right3").hide(),$(".right4").hide(),$("input:radio[name=area]:first").attr("checked",!0),$("#kind_address").each(function(){$(this).find("option:first").attr("selected","true")}),$(".address-item").click(function(){"area-0"==$(this).attr("for")?$("#div-kind-address").show():$("#div-kind-address").hide()}),$("#r-tel").keyup(function(){$(this).val().length<11||$(this).val().length>11?($(this).css({"background-color":"#ffeeef"}),$(this).closest(".info-div").addClass("has-error"),$(".right2 img").prop("src","./img/reserv/ic-error.png"),$(".right2").show()):11==$(this).val().length&&($(this).css({"background-color":"#fff"}),$(this).closest(".info-div").removeClass("has-error"),$(".right2 img").prop("src","./img/reserv/ic-selected.png"),$(".right2").show())}),$("#r-password").keyup(function(){CheckPWVaild()}),$("#r-cpassword").keyup(function(){CheckPWVaild()}),ritem=JSON.parse(sessionStorage.getItem("sd")),sessionStorage.removeItem("sd")});