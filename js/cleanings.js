var clist;
	window.onpageshow = function (event) {
	    if (event.persisted) {
	        //console.log('BFCahe로부터 복원됨');
	        if(!sessionStorage.clist){
	        	location.replace("./check.html");
	        }
	    }
	    else {
	        //console.log('새로 열린 페이지');
	        
	    }
	};
	$(document).ready(function(){
		if(!sessionStorage.clist){
	        location.replace("./check.html");
	    }
	clist = JSON.parse(sessionStorage.getItem('clist'));
	sessionStorage.removeItem('clist');
		
	InitPage(clist);
	$('.slideControls .slidePrev').click(function() {
	        cleaning_slider.goToPrevSlide();
	    });

	    $('.slideControls .slideNext').click(function() {
	        cleaning_slider.goToNextSlide();
	    });

	$('.item-thumbnail').each(function(){
		$(this).addClass(this.width > this.height ? 'landscape' : 'portrait');
	});
	    setTimeout(function() {
	        itemResize();   
	    }, 0);

	var cleaning_slider = $('#cleaning-slider').lightSlider({
		autoWidth:false,
		item:1,
	        	auto:false,
	        	controls: true,
	        	loop:true,
	        	enableTouch:true,
	        	currentPagerPosition:'left',
	        	slideMargin:0
	});
		
	    if($(window).width()>536){
			$("#cleanings-comment").children("div").children("h4").append("클리닝 변경 및 취소는 고객센터로 연락주세요 ^^ (1800-0199)<br>주소 수정, 추가 및 결제는 <span class='highlight'>홈마스터 앱</span>에서 가능합니다!");
		}
		else{
			$("#cleanings-comment").children("div").children("h4").append("클리닝 변경 및 취소는<br> 고객센터로 연락주세요 ^^ (1800-0199)<br>주소 수정, 추가 및 결제는<br> <span class='highlight'>홈마스터 앱</span>에서 가능합니다!");
		}
	});
	function InitPage(clist){
		if(clist.length == 1){
			$(".slideControls").hide();
			$("#num-cleaning").text(clist.length);
			MakeItems(clist);
		}
		else{
			$("#num-cleaning").text(clist.length);
			MakeItems(clist);
		}
	}
	function MakeItems(clist){
		for(var i=0;i<clist.length;i++){
			var itemtext = "<li class='slider-item'><div class='div-slider-item'><div class='item-header text-center'>";
			if(clist[i].period=="1회"){
				itemtext+="<img src='./img/once.png'><h2>한 번만 클리닝</h2><h3 class='highlight'>";
				itemtext+=clist[i].dates[0].substring(0,4)+"."+clist[i].dates[0].substring(4,6)+"."+clist[i].dates[0].substring(6,8)+" / "+clist[i].time + "</h3></div>";
			}else{
				itemtext+="<img src='./img/regular.png'><h2>정기 클리닝</h2><h3 class='highlight'>";
				for(var j=0;j<clist[i].dates.length;j++){
					itemtext+=clist[i].dates[j]+" ";
				}
				itemtext+=" / "+clist[i].time + "</h3></div>";
			}
			//클리닝 소요시간
				itemtext+="<div class='item-body text-center'><div class='item-body-time'><div class='inline-content'><div class='item-font inline-content'><h3>클리닝 소요 시간</h3><h3>"+clist[i].total_duration/60+"시간"+"</h3></div></div></div>";
			//추가 서비스가 있을 경우
				if(clist[i].tasks!=""){
					var tasks =clist[i].tasks.split(',');
					itemtext+="<div class='item-body-addreq'>";
					for(var x=0;x<tasks.length;x++){
						if(x==0){
							itemtext+="<div class='inline-content'><div class='item-font inline-content'><h3>추가 선택 사항</h3><h3>"+tasks[x]+"</h3></div></div>";
						}else{
							itemtext+="<div class='inline-content'><div class='item-font inline-content'><h3></h3><h3>"+tasks[x]+"</h3></div></div>";
						}
					}
				}else{
					itemtext+="<div class='item-body-addreq'>";
					itemtext+="<div class='inline-content'><div class='item-font inline-content'><h3>추가 선택 사항</h3><h3>없음</h3></div></div>";
				}
				itemtext+="</div><div class='item-body-price'><div class='inline-content'><div class='item-font inline-content'><h3>결제 금액</h3><h3>"+clist[i].total_price+"원"+"</h3></div></div></div></div></div></li>";
				$("#cleaning-slider").append(itemtext);
		}
		
	}
	function itemResize() {
	    var sliderWidth = $("#div-slider").width();
	    $(".slider-item").each(function(){
	    	$(this).width(sliderWidth);
	    });
	    setTimeout(itemResize, 0);
	}