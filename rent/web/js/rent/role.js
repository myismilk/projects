let role01 = document.getElementById('role1');
let role02 = document.getElementById('role2');
let center01 = document.getElementById('center01');
let center02 = document.getElementById('center02');
role01.addEventListener('mouseover',(e)=>{
    center01.style.display = 'none';
});
role01.addEventListener('mouseleave',(e)=>{
    center01.style.display = 'block';
});
role02.addEventListener('mouseover',(e)=>{
    center02.style.display = 'none';
});
role02.addEventListener('mouseleave',(e)=>{
    center02.style.display = 'block';
});


var welcome = document.getElementsByClassName("welcomeTitle")[0];
var url=window.location.href;
var userName=getQueryByName(url,"loginName");
//从URL中获取landlord和renters的标记来判定用户是否已经登记个人信息
var landlordMark = getQueryByName(url,"landlord");
var renterMark = getQueryByName(url,"renter");

welcome.innerHTML=userName + "欢迎登录!";
var landlord = document.getElementsByClassName("landlord")[0];
var renter = document.getElementsByClassName("renter")[0];
if(landlordMark == "0"){
    landlord.href='landlordInfo.html';
}else{
    landlord.href='landlord.html?loginName='+ userName;
}
if(renterMark=="0"){
    renter.href='renterInfo.html';
}else{
    renter.href='renter.html?loginName=' + userName;
}


function getQueryByName(url,name)
{
    var reg=new RegExp('[?&]'+name+'=([^&#]+)');
    var query=url.match(reg);
    return query?query[1]:null;
}
function show_confirm()
{
    var tip = confirm('是否退出登录?');
    if(tip)
    {
        return true;
    }
    else
    {
        return false;
    }
}