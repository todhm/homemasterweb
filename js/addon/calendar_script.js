/* Kurien / Kurien's Blog / http://blog.kurien.co.kr */
/* 주석만 제거하지 않는다면, 어떤 용도로 사용하셔도 좋습니다. */

function kCalendar(id, date) {
	var id_kCalendar = document.getElementById(id);
	var D = new Date();
	if( typeof( date ) !== 'undefined' ) {
		date = date.split('-');
		date[1] = date[1] - 1;
		date = new Date(date[0], date[1], date[2]);
	} else {
		var date = new Date();
	}

	//년도를 구함
	var currentYear = date.getFullYear();

	//연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	var currentMonth = date.getMonth() + 1;

	//오늘 일자.
	var currentDate = date.getDate();

	//현재 시간.
	var currentTime = D.getHours();
	//console.log("Current : "+currentYear+"-"+currentMonth+"-"+currentDate+" "+currentTime+"h");
/*
	var xmlHttp;

	// 서버시간은 GMT 기준
	var serverTime = srvTime(), clientTime = new Date();

	console.log( 'crootTime is ' + serverTime + '*** clientTime is ' + clientTime );
*/
	var initYear = D.getFullYear();
	var initMonth = D.getMonth() + 1;
	var initdate = D.getDate();
	var initday = D.getDay();
	//console.log("Today : "+initYear+"-"+initMonth+"-"+initdate);
	//이번달 1일의 요일은 출력. 0은 일요일 6은 토요일
	date.setDate(1);
	var currentDay = date.getDay();

	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.

	var currentLastDate = lastDate[currentMonth-1];
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
	//총 몇 주인지 구함.

	if(currentMonth != 1)
		var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + 1;
	else
		var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + 1;
	//만약 이번달이 1월이라면 1년 전 12월로 출력.

	if(currentMonth != 12)
		var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + 1;
	else
		var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + 1;
	//만약 이번달이 12월이라면 1년 후 1월로 출력.


	if( currentMonth < 10 )
		var currentMonth = '0' + currentMonth;
	//10월 이하라면 앞에 0을 붙여준다.

	var calendar = '';

	//오늘이 마지막 날이라면, 다음달 달력부터 강제 출력
	if(currentYear == initYear && currentMonth == initMonth && initdate == currentLastDate){
		return kCalendar(id, nextDate);
	}

	calendar += '<div id="header">';
	if((currentMonth>initMonth+1 && currentYear == initYear)
		||(currentYear != initYear)){
		calendar += '			<span><a class="button left" onclick="kCalendar(\'' +  id + '\', \'' + prevDate + '\')"><</a></span>';
	}
	calendar += '			<span id="date">' + currentYear + '년 ' + currentMonth + '월</span>';
	calendar += '			<span><a class="button right" onclick="kCalendar(\'' + id + '\', \'' + nextDate + '\')">></a></span>';
	calendar += '		</div>';
	calendar += '		<table border="0" cellspacing="0" cellpadding="0">';
	calendar += '			<caption>' + currentYear + '년 ' + currentMonth + '월 달력</caption>';
	calendar += '			<thead>';
	calendar += '				<tr>';
	calendar += '				  <th class="sun" scope="row">일</th>';
	calendar += '				  <th class="mon" scope="row">월</th>';
	calendar += '				  <th class="tue" scope="row">화</th>';
	calendar += '				  <th class="wed" scope="row">수</th>';
	calendar += '				  <th class="thu" scope="row">목</th>';
	calendar += '				  <th class="fri" scope="row">금</th>';
	calendar += '				  <th class="sat" scope="row">토</th>';
	calendar += '				</tr>';
	calendar += '			</thead>';
	calendar += '			<tbody id="r-calendar-body">';

	var dateNum = 1 - currentDay;

	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '				<td class="' + dateString[j] + '"></td>';
				continue;
			}

			// 월의 마지막날에 대한 다음 월 1일 혹은 2일 예약 불가
			var checkCM = ((currentMonth-1) == 0)? 12: currentMonth-1;
			if(checkCM==initMonth && initdate==lastDate[initMonth-1]
				&&((currentTime>16&&dateNum==1) //현재 월의 마지막날의 5시 이후 예약인 경우, 다음달 1일의 예약 불가.
					|| (initday == 0&&dateNum==1 ) // 오늘 마지막날이고 일요일인 경우 다음달 1일 월요일 예약 불가.
					|| (initday == 6&&currentTime>16&&dateNum==2))) // 오늘 마지막날이고 토요일인 경우 다음달 2일 월요일 예약 불가.
					{
				calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
				continue;
			}
			// // 오늘 마지막날이고 일요일인 경우 다음달 1일 월요일 예약 불가.
			// else if(checkCM==initMonth && initdate==lastDate[initMonth-1]
			// 	&&initday == 0&&dateNum==1 ){
			// 	calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			// 	continue;
			// }
			// // 오늘 마지막날이고 토요일인 경우 다음달 2일 월요일 예약 불가.
			// else if(checkCM==initMonth && initdate==lastDate[initMonth-1]
			// 	&&initday == 6&&currentTime>16&&dateNum==2){
			// 	calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			// 	continue;
			// }
			// 오늘 날짜.
			if(currentYear==initYear && currentMonth==initMonth && initdate==dateNum){
				calendar += '				<td class="today ' + dateString[j] + '">' + dateNum + '</td>';
				continue;
			}
			//현충일의 경우 6월 7일 예약 불가.
			if(currentYear==2017 && currentMonth==6 && initdate>=5 & dateNum==7 && currentTime>16){
				calendar +=  '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
				continue;

			}
			// 현재 일시보다 이전 날짜 선택 불가.
			if((currentYear==initYear && currentMonth==initMonth && dateNum <= initdate)){
				calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			}
			// 평일&토요일 오후 5시 이후에 다음날, 혹은 일요일 전체 다음 월요일 예약 불가
			else if((currentYear==initYear && currentMonth==initMonth) &&
				((currentTime >16 && dateNum==(initdate+1)) // 당일 5시 이후 다음날 예약 불가.
					|| (currentTime >16 && initday == 6 && dateNum==(initdate+2)) // 토요일 5시 이후 다음주 월요일 예약 불가.
					|| (initday == 0 && dateNum==(initdate+1)))) // 오늘이 일요일인 경우 다음날 월요일 예약 불가.
			{
					calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			}
			// // 오늘이 일요일인 경우 다음날 월요일 예약 불가.
			// else if((currentYear==initYear && currentMonth==initMonth) && initday == 0 && dateNum==(initdate+1)){
			// 		calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			// }
			// // 당일 5시 이후 다음날 예약 불가.
			// else if((currentYear==initYear && currentMonth==initMonth) && currentTime >16 && dateNum==(initdate+1)){
			// 		calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			// }
			// 주말 선택 불가.
			else if(dateString[j]=='sat'||dateString[j]=='sun'){
				calendar += '				<td class=" ' + dateString[j] + '">' + dateNum + '</td>';
			}
			else{
				calendar += '				<td class="day ' + dateString[j] + '">' + dateNum + '</td>';
			}

		}
		calendar += '			</tr>';
	}

	calendar += '			</tbody>';
	calendar += '		</table>';
	calendar += "<p class='highlight' style='font-size:12px;'>*당일 예약은 고객센터로 연락주세요 1800-0199</p>";

	id_kCalendar.innerHTML = calendar;

	$(id_kCalendar).find(".day").click(function(){
		$("#r-calendar-body").find("td").removeClass("active");
		$(this).addClass("active");
		var text = $("#date").text() + " " + $(this).text()+"일";
		$("#input-date").val(text);
		$("#r-calendar").hide();
	});
}

//서버시간.
function srvTime(url){
	if(url == undefined) {
		url = window.location.href.toString();
	}
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
	}else{
		return null;
	}
	xmlHttp.open('HEAD',url,false);  //헤더 정보만 받기 위해 HEAD방식으로 요청.
	xmlHttp.setRequestHeader("Content-Type", "text/html");
	xmlHttp.send('');

	return xmlHttp.getResponseHeader("Date");  //받은 헤더정보에서 Date 속성을 리턴.
}
