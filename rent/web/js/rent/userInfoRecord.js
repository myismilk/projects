var userName = document.getElementById("userName");
var userAddr = document.getElementById("userAddr");
var userTel = document.getElementById("userTel");
var man = document.getElementById("man");
var woman = document.getElementById("woman");

//返回上一页
function returnToLastPage() {
    history.go(-1);
}

//性别选择
function sexChangeToW(){
    woman.checked = true;
    man.checked =false;
}
function sexChangeToM(){
    man.checked = true;
    woman.checked = false;
}

//检查输入是否为空
function check() {
    if (userName.value == "" || userAddr.value == "" || userTel == "") {
        alert("输入信息不能为空！");
        return false;
    }
    var msg = confirm("是否确认上传信息？");
    if(msg){

        return true;
    }else{
        return false;
    }
}

//根据id获取页面元素
function getobj(id){
    return document.getElementById(id);
}

//初始化出生日期选择框
function list(){
    var date=new Date();
    var le1=date.getFullYear()-1950+1;
    addlist('year',1950,le1);
    addlist('month',1,12);
    addlist('day',1,31);
}
function febday(){//判断不同的情况下二月的天数，并更改日的列表项中的内容
    var year=getobj('year').value;
    var month=getobj('month').value;
    var bigm=new Array('1','3','5','7','8','10','12');
    var bigstr=bigm.join('-');
    var smallm=new Array('4','6','9','10');
    var smallstr=smallm.join('-');
    if(bigstr.indexOf(month)>-1)
        addlist('day',1,31);
    if(smallstr.indexOf(month)>-1)
        day(30);
    if(month=='2'){
        if(isLeapYear(year)){
            day(29);
        }else{
            day(28);
        }
    }
}
function day(num){//改变二月的天数
    var list=getobj('day');
    for(var i=31;i>num;i--){
        list.options[i]=null;
    }
}
function isLeapYear(year){//是否是闰年
    if((year%400==0)||(year%4==0 && year/100!=0))
        return true;
    return false;
}
function addlist(obj,begin,length){//为列表项中批量添加项目
    var list=getobj(obj);
    list.options[0]=new Option('-');
    for(var i=1;i<=length;i++){
        var num=i+begin-1;
        list.options[i]=new Option(num);
    }
}
//上传租户信息
function upload(){
    var year = document.getElementById("year");
    var month = document.getElementById("month");
    var day = document.getElementById("day");
    var man = document.getElementById("man");
    var woman = document.getElementById("woman");
    var date = year.value+"/"+month.value+"/"+day.value;
    var sex="";
    if(man.checked == true)
        sex=man.value;
    else
        sex=woman.value;
    if (userName.value == "" || userAddr.value == "" || userTel == ""||
        year.value == "-" || day.value == "-" || month == "-") {
        alert("输入信息不能为空！");
        return false;
    }
    var msg = confirm("是否确认上传信息？");
    if(msg){
        $.ajax({
           url:'../renterInfo',
           type:'post',
           data:{"userName":userName.value,"userAddr":userAddr.value,"userTel":userTel.value,
               "userBirth":date,"userSex":sex},
            success:function(data){
               window.location.href ="renter.html?loginName="+data;
            },
            error:function(){

            }
        });
    }else{
        return false;
    }
}