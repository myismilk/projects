function check()
{
    var inputs = document.getElementsByTagName('input');
    var tips1 = document.getElementsByClassName('tips1')[0];
    var tips2 = document.getElementsByClassName('tips2')[0];
    var tips3 = document.getElementsByClassName('tips3')[0];
    if(!inputs[3].checked)
    {
        return false;
    }
    for(var i = 0; i < inputs.length-1; i++)
    {
        var val = inputs[i].value;
        var name = inputs[i].name;
        if(!val || !regMsg(name,val))
        {
            if(name === "input1")
            {
                tips1.style.display = "block";
            }
            else
            {
                tips1.style.display = "none";
            }
            if( name === "input2")
            {
                tips2.style.display = "block";
            }
            else
            {
                tips2.style.display = "none";
            }
            if(name === "input3")
            {
                tips3.style.display = "block";
            }
            else
            {
                tips3.style.display = "none";
            }
            return false;
        }
    }
    var userName = document.getElementById("userName");
    var userPassword = document.getElementById("pw");
    $.ajax({
        url: '../register',
        type:'post',
        data:{'userName':userName.value,'userPassword':userPassword.value},
        success:function(data){
            alert(data);
            if(data=='注册成功！'){
                var msg = confirm("是否返回登录页面?");
                if(msg){
                    window.location.href = "login.html";
                }
            }
        },
        error:function(){
            alert("注册失败!");
        }
    });
}
function regMsg(name, val)
{
    var reg="";
    switch(name)
    {
        case'input1':
            reg=/^[a-zA-Z|0-9]{4,12}$/;
            return reg.test(val);
            break;
        case'input2':
            reg=/^\w{6,20}$/;
            return reg.test(val);
            break;
        case'input3':
            var tmp = document.getElementsByTagName('input')[1].value;
            reg=RegExp('^' + tmp + '$');
            return reg.test(val);
            break;
        default:
            return false;
            break;
    }
}
