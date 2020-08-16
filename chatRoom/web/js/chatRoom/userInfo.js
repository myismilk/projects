/***图片上传及本地显示***/
var change = document.getElementsByClassName("file")[0];
var show = document.getElementById("imageUpload");
change.onclick = function () {
    show.click();
};

//上传用户信息
function upload() {
    var msg = confirm("确认上传信息？");
    if (msg) {
        var nickName =document.getElementsByClassName("nickName")[0];
        var signature = document.getElementsByClassName("signature")[0];
        var imageUpload = document.getElementsByClassName("imageUpload")[0];
        if (nickName.value == "" ) {
            alert("昵称不能为空！");
            return false;
        }
        alert("上传成功！");
        return true;
    }
    return false;
}

var picture = document.getElementsByClassName("pictureContainer")[0];
if (typeof FileReader == 'undefined') {
    result.innerHTML = "抱歉，你的浏览器不支持文件上传";
}

// 将文件以Data URL形式进行读入页面
function readAsDataURL() {
    // 检查是否为图像类型
    var simpleFile = document.getElementById("imageUpload").files[0];
    if (!/image\/\w+/.test(simpleFile.type)) {
        console.log(simpleFile);
        alert("请确保文件类型为图像类型");
        return false;
    }
    var reader = new FileReader();
    // 将文件以Data URL形式进行读入页面
    reader.readAsDataURL(simpleFile);
    reader.onload = function (e) {
        picture.style.background = 'url(' + this.result + ') no-repeat';
        picture.style.backgroundSize = '100% 100%';
    }
}

//设置退出提示
function exitConfirm() {
    var msg = confirm("是否确认退出？");
    if (msg) {
        return true;
    } else {
        return false;
    }
}

//获取鼠标点击时的位置，将页面滚动的情况考虑在内
function getMousePos(event) {
    var screenHeight = $(window).height();
    var scrolltop = $(document).scrollTop();
    var top = (screenHeight - 800) / 2 + scrolltop;
    return top;
}

/*******上传住房信息模块********/
//打开封面之后关闭动画效果
var rightGate = document.getElementsByClassName("right_gate")[0];
var leftGate = document.getElementsByClassName("left_gate")[0];
var nickName = document.getElementsByClassName("nickName")[0];
var signature = document.getElementsByClassName("signature")[0];
nickName.onclick = cancelAnimation;
signature.onclick = cancelAnimation;

function cancelAnimation() {
    rightGate.style.display = "none";
    leftGate.style.display = "none";
}



