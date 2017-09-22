$(document).ready(function(){
 //  	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
 
	// if (mobile) {
	// 	// 유저에이전트를 불러와서 OS를 구분합니다.
	// 	var userAgent = navigator.userAgent.toLowerCase();
	// 	if (userAgent.search("android") > -1){
	// 		currentOS = "android";
	// 	}
	// 	else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)
	// 				|| (userAgent.search("ipad") > -1)){
	// 		currentOS = "ios";
	// 	}		
	// 	else{
	// 		currentOS = "else";
	// 	}
	// } else {
	// 	// 모바일이 아닐 때
	// 	currentOS = "nomobile";
	// }
	sessionStorage.removeItem('bid');
	sessionStorage.removeItem('rp');

	pageResize();

	setTimeout(function() {
	        pageResize();   
	}, 0);
	
	ToggleWhite();
	
	//loadVideos();
	$(window).scroll(function(){
		var position = $(window).scrollTop();
		//var scheight = $(window).height() * 1 / 5;
		if(position > 5){
			ToggleRed();
		}
		else{
			ToggleWhite();
		}
	});

	// Make a slider for reviews by getting JSON data from server
	$.ajax({
		type:"GET",
		dataType:"json",
		url:"/review.json",
		success:function(data){
			DrawReviewContents(data[0].main);
			var review_slider = $('#review-slider').lightSlider({
			    autoWidth:true,
				auto:false,
			 	controls: true,
				loop: false,
				enableTouch:true,
				slideMargin:0,
			   	onBeforeSlide: function (el) {
			            	$('#current').text(el.getCurrentSlideCount());
			        	} 
			});
			//$('.slideControls .slidePrev').hide();
			$('#text_review_more').append(data[0].contents.length+"개의 후기<br>전체보기");
			$('#current').text(review_slider.getCurrentSlideCount());
			$('#total').text(review_slider.getTotalSlideCount());	
			$('.slideControls .slidePrev').click(function() {
				review_slider.goToPrevSlide();
				// if(review_slider.getCurrentSlideCount() == 1){
				// 	$(this).hide();
				// }
			 //    $('.slideControls .slideNext').show();
			});

			$('.slideControls .slideNext').click(function() {
			    review_slider.goToNextSlide();
			  //   if($(window).width()>1800){
			  //   	if(review_slider.getCurrentSlideCount() == 2){
					// 	$(this).hide();
					// }else{
					// 	$(this).show();
					// }
			  //   }
			  //   else if($(window).width()>1351 && $(window).width()<=1800){
			  //   	if(review_slider.getCurrentSlideCount() == 3){
					// 	$(this).hide();
					// }else{
					// 	$(this).show();
					// }
			  //   }
			  //   else if($(window).width()>860 && $(window).width()<=1351){
			  //   	if(review_slider.getCurrentSlideCount() == 4){
					// 	$(this).hide();
					// }else{
					// 	$(this).show();
					// }
			  //   }
			  //   else if($(window).width()>752 && $(window).width()<=860){
			  //   	if(review_slider.getCurrentSlideCount() == 5){
					// 	$(this).hide();
					// }else{
					// 	$(this).show();
					// }
			  //   }
			    //$('.slideControls .slidePrev').show();
			});
		}
	});	
	
    	$('.item-thumbnail').each(function(){
	    $(this).addClass(this.width > this.height ? 'landscape' : 'portrait');
	});

    // Get the data for Event from server
    // Make any banner as much as the number of data length
	GetActiveEventsQuery();

	// 한번만 클리닝 버튼 클릭
	$("#btn_reserv2").click(function(){
		sessionStorage.setItem('t', 1);
		location.href = "./nreserv.html";
	});
	// 정기 클리닝 버튼 클릭
	$("#btn_reserv").click(function(){
		sessionStorage.setItem('t', 2);
		location.href = "./reserv_regular.html";
	});

	if($(window).width()>500){
		$("#row4-content").children('h1').append('“아줌마” 보다 “마스터님”으로 불러주세요');
		$("#row4-content").children('p').append('홈마스터의 서비스 원동력은 바로 마스터님 입니다.<br>마스터님은 누군가의 어머니와 아버지이며, 이웃이자 친구입니다.<br> 서울시내 약 100여분의 마스터님들은<br> 행복한 공간을 만들기 위해 오늘도 땀흘리고 계십니다.<br>  소중한 공간을 관리하는 마스터님을 존중해주세요.');
	}else{
		$("#row4-content").children('h1').append('“아줌마” 보다<br> “마스터님”으로 불러주세요');
		$("#row4-content").children('p').append('홈마스터의 서비스 원동력은 바로 마스터님 입니다.<br>마스터님은 누군가의 어머니와 아버지이며,<br> 이웃이자 친구입니다.<br><br> 서울시내 약 100여분의 마스터님들은<br> 행복한 공간을 만들기 위해 오늘도 땀흘리고 계십니다.<br>  소중한 공간을 관리하는 마스터님을 존중해주세요.');
	}
	

});
$(window).on('resize', pageResize);
//$(window).on('resize', pageCenter);

//video Size Check
function pageResize() {
    //var windowHeight = $(window).height()*2/3;
    var windowWidth = $(window).width();
    if(windowWidth > 1902){
    	$('#div-video-main').css({'width':windowWidth ,'height':800});
    	$("#main-title").css('margin-top', 200);
    	for(var i=1;i<4;i++){
    		$("#contents-img-"+i).attr("src","./img/main/contents-"+i+".jpg");
    	}
    }
    else if(windowWidth>750 && windowWidth <= 1902){
    	$('#div-video-main').css({'width':windowWidth ,'height':650});
    	$("#main-title").css('margin-top', 130);
    	for(var i=1;i<4;i++){
    		$("#contents-img-"+i).attr("src","./img/main/contents-"+i+".jpg");
    	}
    }else{
    	$('#div-video-main').css({'width':windowWidth ,'height':$(window).height()});
    	$("#main-title").css('margin-top', $(window).height()*2/7);
    	for(var i=1;i<4;i++){
    		$("#contents-img-"+i).attr("src","./img/main/contents-m-"+i+".jpg");
    	}
    	if(windowWidth<486){
			$('.slider-item').each(function(){
			    $(this).css({"width":$(window).width()});
			    $(".item-div").css({"width":$("#div-slider").width()});
			    $(".item-title").css({"width":$("#div-slider").width()});
				$(".item-content").css({"width":$("#div-slider").width()});
				$(".item-footer").css({"width":$("#div-slider").width()});
			});	
		}else{
			$('.slider-item').each(function(){
			    $(this).css("width",360);
			    $(".item-div").css({"width":360});
			    $(".item-title").css({"width":340});
				$(".item-content").css({"width":340});
				$(".item-footer").css({"width":340});
			});	
		}
    }
    setTimeout(pageResize, 0);
}
	
function loadVideos(){
    $("video").each(function(index){
        $(this).get(0).load();
        $(this).get(0).addEventListener("canplaythrough", function(){
            this.play();
            this.pause();
        });
    });
}
// function pageCenter() {
// 	var windowWidth = $(window).width();
//       if(windowWidth>750){
//       $('#main-title').css({
//             position:'absolute',
//             left: ($(window).width() - $('#main-title').outerWidth())/2,
//             'margin-top': 0,
//             'margin-left': 0
//         });
//   	}
  
// }

function ToggleRed(){
	$(".navbar-brand img").attr("src","./img/logo.png");
	$(".navbar-header p").css("color", "#ff5859");
	$("#head_container").addClass("scrolled");
	$("#nav-menu ul li a").addClass("font-red").removeClass("font-white");
}
function ToggleWhite(){
	$(".navbar-brand img").attr("src","./img/logo_w.png");
	$(".navbar-header p").css("color", "#fff");
	$("#head_container").removeClass("scrolled");
	$("#nav-menu ul li a").addClass("font-white").removeClass("font-red");
}
function DrawReviewContents(review_jsondata){
	var txt = "";
	for(var i = 0; i<review_jsondata.length;i++){
		txt +=	'<li class="slider-item">'
		txt +=		'<div>'
		txt +=		  	'<img class="item-refer" src="'+review_jsondata[i].type+'">';
		txt +=		  	'<img class="item-thumbnail" src="'+review_jsondata[i].img+'">';
		txt +=		  	'<div class="item-div">';
		txt +=		  		'<p class="item-title">'+review_jsondata[i].title+'</p>';
		txt +=		  		'<p class="item-content">'+review_jsondata[i].content+'</p></div>';
		txt +=		  	'<div class="item-footer item-inline">';
		txt +=		  		'<p class="item-date">'+review_jsondata[i].date+'</p>';
		txt +=		  		'<a class="item-link" href="'+review_jsondata[i].link+'" target="_blank">후기 보러가기</a>';
		txt +=		  	'</div></div></li>';
	}
	$("#review-slider").prepend(txt);
}