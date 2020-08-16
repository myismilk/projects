var pageUp = document.getElementsByClassName("pageUp")[0];
pageUp.onclick = toRole;
pageUp.style.border = "0";
function toRole(){
    $.ajax({
       url:'../toRole',
       type:'post',
       success:function(data){
           window.location.href = data;
       },
        error:function(){
           alert("Error!!!");
        }
    });
}