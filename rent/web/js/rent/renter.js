var c1 = document.getElementsByClassName("choose1")[0];
var c2 = document.getElementsByClassName("choose2")[0];
var body1 = document.getElementsByClassName("body1")[0];
var body2 = document.getElementsByClassName("body2")[0];
var header = document.getElementsByClassName("header")[0];
var body = document.getElementById("body");
var userPicture = document.getElementsByClassName("picture")[0];

/***设置pageup的返回地址***/
var url = document.location.href;
var userName = getQueryByName(url, "loginName");
var pageUp = document.getElementsByClassName("pageUp")[0];
var forum = document.getElementsByClassName("forum")[0];
forum.href = 'forum.html?loginName=' + userName;

function getQueryByName(url, name) {
    var reg = new RegExp('[?&]' + name + '=([^&#]+)');
    var query = url.match(reg);
    return query ? query[1] : null;
}

function choose1() {
    c1.style.backgroundColor = "darkblue";
    c1.style.color = "white";
    c2.style.backgroundColor = "lightblue";
    c2.style.color = "black";
    body1.style.display = 'block';
    body2.style.display = 'none';
    body.style.overflowY = "hidden";
    header.style.positon = "fixed";
}

function choose2() {
    c2.style.backgroundColor = "darkblue";
    c2.style.color = "white";
    c1.style.backgroundColor = "lightblue";
    c1.style.color = "black";
    body2.style.display = 'block';
    body1.style.display = 'none';
    body.style.overflowY = "visible";
    header.style.position = 'absolute';
    /*****已租房屋信息显示******/
    var arr3 = "";
    $.ajax({
        url: "../getRenterInfo",
        type: "post",
        dataType: 'json',
        success: function (data) {
            arr3 = data;
            var body = document.getElementsByClassName("body2")[0];
            if (arr3.length == 0) {
                alert("您还没租有房屋！！！");
            } else {
                for (var i = 0; i < arr3.length; i++) {
                    var div = document.createElement("div");
                    div.style.fontSize = "20px";
                    div.style.position = "absolute";
                    div.style.width = "30%";
                    div.style.height = "820px";
                    var j = parseInt(i / 3);
                    div.style.top = 130 + 900 * j + "px";
                    div.style.left = (i % 3) * 30 + (i % 3 + 1) * 3 + "%";
                    div.style.borderRadius = "15px";
                    div.style.backgroundColor = " #65EEB4";
                    div.style.textAlign = "center";
                    var div1 = document.createElement("div");
                    div1.innerText = "房型 ";
                    div1.style.position = "relative";
                    div1.style.top = "5%";
                    var div1Input = document.createElement("input");
                    div1Input.type = "text";
                    div1Input.style.fontSize = "18px";
                    div1Input.value = arr3[i].roomType;
                    div1.appendChild(div1Input);
                    div.appendChild(div1);
                    var div3 = document.createElement("div");
                    div3.style.position = "relative";
                    div3.style.top = "8%";
                    div3.innerHTML = "出租房描述<br>";
                    var div3Textarea = document.createElement("textarea");
                    div3Textarea.rows = "6";
                    div3Textarea.cols = "60";
                    div3Textarea.style.borderRadius = "10px";
                    div3Textarea.style.fontSize = "18px";
                    div3Textarea.style.height = "95px";
                    div3Textarea.style.width = "80%";
                    div3Textarea.value = arr3[i].des + " 地址:" + arr3[i].addr + " 房客人数上限:" + arr3[i].maxRenter + " 租金:" + arr3[i].rent;
                    div3.appendChild(div3Textarea);
                    div.appendChild(div3);
                    var div4 = document.createElement("div");
                    div4.innerHTML = "展示图片<br>";
                    div4.style.position = "relative";
                    div4.style.top = "9%";
                    var div5 = document.createElement("div");
                    div5.style.position = "relative";
                    div5.style.top = "14%";
                    div5.style.left = "2.5%";
                    div5.style.background = "url(" + arr3[i].photoPath + ")";
                    div5.style.backgroundSize = "100% 100%";
                    div5.style.width = "95%";
                    div5.style.height = "500px";
                    div5.style.borderRadius = "14px";
                    div4.appendChild(div5);
                    div.appendChild(div4);
                    var input1 = document.createElement("button");
                    input1.innerText = "退房";
                    input1.style.position = "relative";
                    input1.style.top = "90px";
                    input1.style.left = "0";
                    input1.style.width = "70px";
                    input1.style.height = "34px";
                    input1.style.border = "0";
                    input1.style.borderRadius = "10px";
                    input1.style.backgroundColor = "yellow";
                    input1.style.fontSize = "18px";
                    input1.style.textAlign = "center";
                    input1.readOnly = "readonly";
                    input1.className = "renter" + i;
                    input1.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#ff6218";
                    }, true);
                    input1.addEventListener("mouseout", function () {
                        this.style.backgroundColor = "yellow";
                    }, true);
                    input1.onclick = function () {
                        var msg = confirm("是否确定退房?");
                        if (msg) {
                            var renterId = " ";
                            var roomId = " ";
                            for (var i = 0; i < arr3.length; i++) {
                                if (this.className == "renter" + i) {
                                    renterId = arr3[i].renterId;
                                    roomId = arr3[i].roomId;
                                    break;
                                }
                            }
                            $.ajax({
                                url: '../checkOut',
                                type: 'post',
                                data: {'renterId': renterId, 'roomId': roomId},
                                success: function (data) {
                                    alert(data);
                                    location.reload(true);
                                },
                                error: function () {
                                    alert("Error!");
                                }
                            });
                        }
                    };
                    div.appendChild(input1);
                    body.appendChild(div);
                }
            }
        },
        error: function () {
            alert("Error!!!");
        }
    });
}

//设置当前用户登录名称的显示
var userName = getUserName();
var showUserName = document.getElementsByClassName("userName")[0];
showUserName.innerText = userName;

function getUserName() {
    var url = window.location.href;
    var reg = new RegExp('[?&]' + "loginName=" + '([^&#]+)');
    var result = url.match(reg);
    return result ? result[1] : null;
}

/*****住房信息展示模块*****/
var arr = "";//存储服务器返回的展示信息
window.onload = function () {
    //背景
    background();
    //设置图片懒加载
    var observer = new IntersectionObserver(function (args) {
        args.forEach(function (el) {
            if (el.intersectionRatio > 0) {
                el.target.style.background = el.target.getAttribute('imgURL');
                el.target.style.backgroundSize = '100% 100%';
                observer.unobserve(el.target);
            }
        });
    });

    $.ajax({
        url: "../downloadInfo",
        type: "post",
        dataType: 'json',
        success: function (data) {
            arr = data;
            if (arr[arr.length - 1].userPicture != 'empty') {
                userPicture.style.background = "url(" + arr[arr.length - 1].userPicture + ")";
                userPicture.style.backgroundSize = "100% 100%";
            }
            var parent = document.getElementsByClassName("body1")[0];
            var temph = 0;
            for (var i = 0; i < arr.length - 1; i++) {
                var div = document.createElement("div");
                div.className = i;
                var j = parseInt(i / 3);
                temph = j * 50;
                div.style.top = 550 * j + 30 + temph + "px";
                div.style.width = "27%";
                div.style.height = "550px";
                div.style.position = "absolute";
                div.style.left = 5 + 30 * (i % 3) + "%";
                div.style.textAlign = "center";
                div.onclick = showInfo;
                parent.appendChild(div);
                var p = document.createElement("p");
                p.style.margin = "0";
                p.style.fontSize = "25px";
                p.style.color = "rgba(255, 25, 26, 0.51)";
                p.style.height = "50px";
                if (arr[i].isRented == 0) {
                    var isrented = "待租赁";
                } else {
                    isrented = "已出租";
                }
                p.innerHTML = arr[i].roomType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + isrented;
                div.appendChild(p);
                var div1 = document.createElement("div");
                div1.style.height = "500px";
                div1.style.background = 'url(../css/waiting.png)';
                div1.setAttribute('defaultImg','url(../css/waiting.png)');
                div1.setAttribute('imgURL',"url(" + arr[i].photoPath + ")");
                observer.observe(div1);
                div1.style.backgroundSize = "100% 100%";
                div.appendChild(div1);
            }
        },
        error: function () {
            alert("Error");
        }
    });
};

//设置弹出框
function showInfo() {
    var body = document.getElementById("body");
    //var divParent = document.createElement("divParent");
    var divChild = document.createElement("div");
    var divParent = document.createElement("div");
    divParent.style.position = "absolute";
    divParent.style.width = "100%";
    divParent.style.height = "100vh";
    divParent.style.overflow = 'auto';
    divParent.className = "divParent";
    divParent.appendChild(divChild);
    var body1 = document.getElementsByClassName("body1")[0];
    for (var i = 0; i < arr.length; i++) {
        if (i == this.className) {
            var description = arr[i].des;
            var maxRenter = arr[i].maxRenter;
            var rent = arr[i].rent;
            var addr = arr[i].addr;
            var photoPath = arr[i].photoPath;
            var isRented = arr[i].isRented;
            var roomId = arr[i].roomId;
            var isOver = arr[i].isOver;
            break;
        }
    }
    body1.style.opacity = "0.5";
    divChild.className = "showInfo";
    divChild.style.width = "650px";
    divChild.style.height = "750px";
    divChild.style.position = "absolute";
    divChild.style.left = "50%";
    divChild.style.marginLeft = "-325px";
    var topDistance = getMousePos();
    divChild.style.top = topDistance + "px";
    divChild.style.backgroundColor = "#eefcff";
    divChild.style.borderRadius = "30px";
    var p2 = document.createElement("p");
    var p2 = document.createElement("p");
    p2.style.margin = "10px 20px 0";
    p2.style.height = "81px";
    p2.style.fontSize = "20px";
    p2.style.wordBreak = "break-all";
    p2.style.whiteSpace = "normal";
    p2.style.textIndent = "2em";
    p2.style.textAlign = "none";
    p2.innerText = description + " 地址:" + addr + " 房客人数上限:" + maxRenter + " 租金:" + rent;
    p2.style.overflow = "auto";
    divChild.appendChild(p2);
    var picDiv = document.createElement("div");
    picDiv.style.height = "570px";
    picDiv.style.backgroundImage = "url(" + photoPath + ")";
    picDiv.style.backgroundSize = "100% 100%";
    picDiv.style.margin = "10px 18px 0";
    picDiv.style.borderRadius = "20px";
    divChild.appendChild(picDiv);
    var button1 = document.createElement("button");
    button1.style.position = "absolute";
    button1.style.fontSize = "18px";
    button1.style.backgroundColor = "#ffae7a";
    button1.style.border = "0";
    button1.style.height = "55px";
    button1.style.width = "100px";
    button1.style.left = "200px";
    button1.style.top = "680px";
    button1.style.borderRadius = "50%";
    button1.innerText = "申请租住";
    button1.onclick = function () {
        var msg = confirm("是否确认申请?");
        if (msg) {
            $.ajax({
                url: '../rentRequestRenter',
                type: 'post',
                data: {'roomId': roomId},
                async: true,
                cache: true,
                success: function (data) {
                    alert(data);
                    location.reload(true);
                },
                error: function () {
                    alert("Error!!!");
                }
            });
        }
    };
    button1.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#ff6218";
    }, true);
    button1.addEventListener("mouseout", function () {
        this.style.backgroundColor = "#ffae7a";
    }, true);
    if (isRented == 1 || isOver == 'false') {
        button1.disabled = "disabled";
    }
    divChild.appendChild(button1);
    var button2 = document.createElement("button");
    button2.style.position = "absolute";
    button2.style.fontSize = "18px";
    button2.style.backgroundColor = "#ffae7a";
    button2.style.border = "0";
    button2.style.height = "55px";
    button2.style.width = "100px";
    button2.style.left = "350px";
    button2.style.top = "680px";
    button2.style.borderRadius = "50%";
    button2.innerText = "返回";
    button2.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#ff6218";
    }, true);
    button2.addEventListener("mouseout", function () {
        this.style.backgroundColor = "#ffae7a";
    }, true);
    button2.onclick = function () {
        divChild.style.display = "none";
        body1.style.opacity = "1";
        divParent.style.display = "none";
    };
    divChild.appendChild(button2);
    body.appendChild(divParent);
}

//获取鼠标点击时的位置，将页面滚动的情况考虑在内
function getMousePos(event) {
    var screenHeight = $(window).height();
    var scrolltop = $(document).scrollTop();
    var top = (screenHeight - 800) / 2 + scrolltop;
    return top;
}


