$( function() {

}); 
$(document).ready(function(){
	$.ajax({
		dataType:"json",
		url:"/faqjson.json",
		success:function(data){
			DrawFAQContents(data[0]);
			$('#panel-type-total').on('show.bs.collapse', function () {
				console.log("clicked");
				$('#accordion .in').collapse('hide');
			});
		}
	});	
});

function DrawFAQContents(data){
	//0 : 예약, 1 : 클리닝, 2 : 결제, 3 : 취소-변경, 4 : 전체
	//type : type of part
	var txt ="";
	for(var i = 0; i<data.type.length;i++)
		txt += "<div role='tabpanel' class='tab-pane' id='type-"+i+"'><div class='panel-group' id='panel-type-"+i+"' role='tablist' aria-multiselectable='true'></div></div>";
	$("#div-tabpanel").append(txt);
	for(var i = 0; i<data.contents.length;i++){
		txt = "<div class='panel panel-default'>"
		txt +=	"<div class='panel-heading' role='tab' id='head-content-"+i+"'><h4 class=' panel-title collapsed' data-toggle='collapse' data-parent='#panel-type-total' data-target='#body-content-"+i+"' ><a class=''><span class='' style='margin-right:5px;'>Q.</span>"+data.contents[i].title+"</a></h4></div><div id='body-content-"+i+"' class='panel-collapse collapse' role='tabpanel'><div class='panel-body inline-content'><div class='highlight' style='margin-right:5px;'>A.</div><div>"+data.contents[i].content+"</div></div></div></div>";
		$("#panel-type-total").append(txt);
		txt = "<div class='panel panel-default'><div class='panel-heading ' role='tab' id='head-content-each-"+i+"'><h4 class='panel-title collapsed' data-toggle='collapse' data-parent='#panel-type-"+data.contents[i].type+"' href='#body-content-each-"+i+"'><a class=''><span class='' style='margin-right:5px;'>Q.</span>"+data.contents[i].title+"</a></h4></div><div id='body-content-each-"+i+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='head-content-each-"+i+"'><div class='panel-body inline-content'><div class='highlight' style='margin-right:5px;'>A.</div><div>"+data.contents[i].content+"</div></div></div></div>";
		$("#panel-type-"+data.contents[i].type).append(txt);
	}
}