var url=window.location.href;
var boolValue=getQueryByName(url,'error');
if(boolValue == 'yes')
{
    var error = document.getElementsByClassName("error")[0];
    error.style.display = "block";
}
function getQueryByName(url,name)
{
    var reg=new RegExp('[?&]'+name+'=([^&#]+)');
    var query=url.match(reg);
    return query?query[1]:null;
}
function check()
{
    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++)
    {
        var val = inputs[i].value;
        if(!val)
        {
            var error = document.getElementsByClassName('error')[0];
            error.innerText = '输入的信息不能为空！';
            error.style.display = "block";
            return false;
        }
    }
    return true;
}