$(document).ready(function(){



    var Model = function(){
        var self = this;
        var data =  {data:{
                        date:'',
                        name: '',
                        address:'',
                        phone_number:'',
                        cleaning_space:'',
                        auth_token:'qi_03bd2cea395190888a763dc68b869790'
                    }};
        self.auth_data = ko.observable(data);
        var checkboxes = [  {name:'청소에 필요한 장비와 세제 등은 작업자 준비사항입니다. (쓰레기봉투 제외)'},
                            {name:'곰팡이 제거와 스티커, 시트지 제거 시 추가비용이 있을 수 있습니다.'},
                            {name:'실평수가 아닌 분양평수 기준이며 평형대가 맞지 않을 경우 추가 비용이 발생합니다.'},
                            {name:'청소하는 장소의 노후 정도 혹은 오염 상태가 일반적인 공간보다 심각하여'+"\n"+'평균 청소시간보다 훨씬 더 많은 시안이 소용될 경우 추가 비용이 발생합니다.'},
                            {name:'외부 유리창과 난간은 추가 비용이 발생합니다.'},
                            {name:'주차비와 폐기물 처리에 대한 비용이 발생할 경우, 고객님 부담 사항입니다.'},
                            {name:'하루 전날 취소나 변경 시 위약금 20%, 당일 취소나 변경 시 위약금 30% 가 발생합니다.'}]

        self.checkbox_lst = ko.observableArray(checkboxes);
    }

    var ViewModel = function(){
        var self = this;
        self.model_data = new Model();
        kCalendar('r-calendar');
        $("#r-calendar").hide();
        self.show_calendar = false;
        self.click_calendar= function(){
                self.show_calendar = !self.show_calendar;
                if(self.show_calendar){
                    console.log(1234);
                    $("#r-calendar").show();

                }
                else{
                    console.log(5678);
                    $("#r-calendar").hide();

                }

        };
        self.set_date = function(){
            var date = $('#input-date').val();
            if (date == ''){
                alert('날짜를 선택해 주세요.');
                return false;

            }
            else{
                var myRe2 = /\d+/g;
                date_lst = date.match(myRe2);
                date = date_lst[0] + date_lst[1] + date_lst[2];
                self.model_data.auth_data().data['date']  = date;
                return true
            }
        };
        self.set_name =   function(){
            var name = $('#off-rname').val();
            if(name == ''){
                alert('올바른 이름을 입력해주세요.');
                return false;
            }
            else{
                self.model_data.auth_data().data['name'] = name;
                return true;
            }
        };
        self.set_add =  function(){
            var add = $('#off-add').val();
            if(add ==''){
                alert('올바른 주소를 입력해주세요');
                return false;
            }
            else{
                self.model_data.auth_data().data['address'] = add;
                return true;
            }
        }
        self.set_num = function(){
            var num = $('#off-tel').val();
            if(self.is_number(num)){
                self.model_data.auth_data().data['phone_number'] = num;
                return true;
            }
            else{
                 alert('올바른 번호를 입력해 주세요');
                 return false;
             }

        }
        self.set_size =function(){
            var size = $('#off-size').val();
            if(!isNaN(parseFloat(size)) && isFinite(size)){
                size = parseInt(size);
                self.model_data.auth_data().data['cleaning_space'] = size;
                return true;
            }
            else{
                alert('올바른 평수를 입력해 주세요.');
                return false;
            }

        }
        self.is_number= function(num){
            var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
            var regExp2 = /^\d{2,3}-\d{3,4}-\d{4}$/;
            var regExp3 = /^0\d{10}$/;
            var regExp4 = /^0\d{9}$/;
            var regExp5 = /^0\d{8}$/;
            if (regExp.test(num) ||regExp2.test(num)||regExp3.test(num)||regExp4.test(num)||regExp5.test(num) ){
                return true;

            }
            else{
                return false;
            }
        }
        $.support.cors = true;
        self.make_ajax = function(){
            console.log(12345);
            var is_date = self.set_date();
            var is_name = self.set_name();
            var is_add = self.set_add();
            var is_num = self.set_num();
            var is_size = self.set_size();
            if(is_date && is_name && is_add && is_num && is_size){
                $.ajax({
                    type:"POST",
                    url: "https://hm-live.skoopmedia.co.kr/api/reservation/move_create",
                    data: self.model_data.auth_data().data,
                    crossDomain: true,
                    dataType: "json",
                     success: function (msg) {
                        if(msg.return_code==1 && msg.return_message==""){
                            alert("예약이 접수되었습니다.");
                            location.replace('./index.html');
                        }
                        else{
                            if(msg.return_message != ""){
                                alert(msg.return_message);
                            }

                        }
                    },
                    error: function(msg){
                        console.log("Query Fail");
                    }
                });
            };
        };
    };


    ko.applyBindings(new ViewModel());
    var set_checkbox = function(){
        $('dd .check01').each(function(index){
                console.log("Hey you this is index");
                this.dealy(index * 200).animate({
                'top':'0',
                'opacity':'1.0'
            },500,'swing')});
        }
    set_checkbox();

});
