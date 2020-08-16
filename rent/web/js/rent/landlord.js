var c1 = document.getElementsByClassName("choose1")[0];
var c2 = document.getElementsByClassName("choose2")[0];
var c3 = document.getElementsByClassName("choose3")[0];
var c4 = document.getElementsByClassName("choose4")[0];
var body = document.getElementById("body");
var body1 = document.getElementsByClassName("body1")[0];
var body2 = document.getElementsByClassName("body2")[0];
var body3 = document.getElementsByClassName("body3")[0];
var body4 = document.getElementsByClassName("body4")[0];
var header = document.getElementsByClassName("header")[0];
var userPicture = document.getElementsByClassName("picture")[0];
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

/***图片上传及本地显示***/
var change = document.getElementsByClassName("file")[0];
var show = document.getElementById("imageUpload");
change.onclick = function () {
    show.click();
};

/***设置pageup的返回地址***/
var url = document.location.href;
var userName = getQueryByName(url, "loginName");
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
    c3.style.backgroundColor = "lightblue";
    c3.style.color = "black";
    c4.style.backgroundColor = "lightblue";
    c4.style.color = "black";
    body1.style.display = 'block';
    body2.style.display = 'none';
    body3.style.display = 'none';
    body4.style.display = 'none';
    body.style.overflowY = "hidden";
    header.style.position = 'fixed';
    showUserName.disabled = false;
}

function choose2() {
    c2.style.backgroundColor = "darkblue";
    c2.style.color = "white";
    c1.style.backgroundColor = "lightblue";
    c1.style.color = "black";
    c3.style.backgroundColor = "lightblue";
    c3.style.color = "black";
    c4.style.backgroundColor = "lightblue";
    c4.style.color = "black";
    body2.style.display = 'block';
    body1.style.display = 'none';
    body3.style.display = 'none';
    body4.style.display = 'none';
    body.style.overflowY = "visible";
    header.style.position = 'absolute';
    showUserName.disabled = true;
}

var arr3 = " ";

function choose3() {
    c3.style.backgroundColor = "darkblue";
    c3.style.color = "white";
    c2.style.backgroundColor = "lightblue";
    c2.style.color = "black";
    c1.style.backgroundColor = "lightblue";
    c1.style.color = "black";
    c4.style.backgroundColor = "lightblue";
    c4.style.color = "black";
    body3.style.display = 'block';
    body2.style.display = 'none';
    body1.style.display = 'none';
    body4.style.display = 'none';
    body.style.overflowY = "visible";
    header.style.position = 'absolute';
    showUserName.disabled = false;
    /*****名下出租房信息显示******/
    $.ajax({
        url: "../getLandlordInfo",
        type: "post",
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            arr3 = data;
            var body = document.getElementsByClassName("body3")[0];
            if (arr3.length == 0) {
                alert("您还没有上传住房信息！！！");
            } else {
                for (var i = 0; i < arr3.length; i++) {
                    var div = document.createElement("div");
                    div.style.fontSize = "20px";
                    div.style.position = "absolute";
                    div.style.width = "30%";
                    div.style.height = "860px";
                    var j = parseInt(i / 3);
                    div.style.top = 130 + 900 * j + "px";
                    div.style.left = (i % 3) * 30 + (i % 3 + 1) * 3 + "%";
                    div.style.borderRadius = "15px";
                    div.style.backgroundColor = " #8b98ff";
                    div.style.textAlign = "center";
                    var div3 = document.createElement("div");
                    div3.style.position = "relative";
                    div3.style.top = "2%";
                    div3.innerHTML = "出租房描述<br>";
                    var div3Textarea = document.createElement("textarea");
                    div3Textarea.rows = "6";
                    div3Textarea.cols = "60";
                    div3Textarea.style.fontSize = "18px";
                    div3Textarea.style.height = "100px";
                    div3Textarea.style.width = "80%";
                    div3Textarea.style.borderRadius = "10px";
                    div3Textarea.className = "des" + i;
                    div3Textarea.value = arr3[i].des;
                    div3.appendChild(div3Textarea);
                    div.appendChild(div3);
                    var div1 = document.createElement("div");
                    var insertText = document.createTextNode("房型 ");
                    div1.style.position = "relative";
                    div1.style.top = "5%";
                    var div1Input = document.createElement("input");
                    div1Input.type = "text";
                    div1Input.value = arr3[i].roomType;
                    div1Input.className = "roomType" + i;
                    var div1Input02 = document.createElement("input");
                    var insertText02 = document.createTextNode("  房屋租金 ");
                    div1Input02.type = "text";
                    div1Input02.value = arr3[i].rent;
                    div1Input02.className = "rent" + i;
                    div1.appendChild(insertText);
                    div1.appendChild(div1Input);
                    div1.appendChild(insertText02);
                    div1.appendChild(div1Input02);
                    div.appendChild(div1);
                    var div2 = document.createElement("div");
                    var insertText03 = document.createTextNode("地址 ");
                    div2.style.position = "relative";
                    div2.style.top = "8%";
                    div2.appendChild(insertText03);
                    var div2Input = document.createElement("input");
                    div2Input.type = "text";
                    div2Input.value = arr3[i].addr;
                    div2Input.className = "addr" + i;
                    div2.appendChild(div2Input);
                    var insertText04 = document.createTextNode("  房客上限 ");
                    div2.style.position = "relative";
                    div2.style.top = "8%";
                    div2.appendChild(insertText04);
                    var div2Input02 = document.createElement("input");
                    div2Input02.type = "text";
                    div2Input02.value = arr3[i].addr;
                    div2Input02.className = "maxRenter" + i;
                    div2.appendChild(div2Input02);
                    div.appendChild(div2);
                    var div4 = document.createElement("div");
                    div4.innerHTML = "展示图片<br>";
                    div4.style.position = "relative";
                    div4.style.top = "11%";
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
                    input1.innerText = "修改";
                    input1.style.position = "relative";
                    input1.style.top = "100px";
                    input1.style.left = "-40px";
                    input1.style.width = "70px";
                    input1.style.height = "34px";
                    input1.style.border = "0";
                    input1.style.borderRadius = "10px";
                    input1.style.backgroundColor = "yellow";
                    input1.style.fontSize = "18px";
                    input1.style.textAlign = "center";
                    input1.readOnly = "readonly";
                    input1.className = "update" + i;
                    input1.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#ff6218";
                    }, true);
                    input1.addEventListener("mouseout", function () {
                        this.style.backgroundColor = "yellow";
                    }, true);
                    input1.onclick = function () {
                        var msg = confirm("是否确定修改?");
                        if (msg) {
                            var roomType = " ", rent = " ", des = " ", maxRenter = "", addr = " ", roomId = " ";
                            for (var i = 0; i < arr3.length; i++) {
                                if (this.className == ("update" + i)) {
                                    roomType = document.getElementsByClassName("roomType" + i)[0];
                                    rent = document.getElementsByClassName("rent" + i)[0];
                                    maxRenter = document.getElementsByClassName("maxRenter" + i)[0];
                                    des = document.getElementsByClassName("des" + i)[0];
                                    addr = document.getElementsByClassName("addr" + i)[0];
                                    roomId = arr3[i].roomId;
                                }
                            }
                            $.ajax({
                                url: '../landlordUpdate',
                                type: 'post',
                                data: {
                                    'roomType': roomType.value,
                                    'rent': rent.value,
                                    'des': des.value,
                                    'addr': addr.value,
                                    'maxRenter': maxRenter.value,
                                    'roomId': roomId
                                },
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
                    if (arr3[i].isRented == 1) {
                        input1.disabled = "disabled";
                    }
                    div.appendChild(input1);
                    var input2 = document.createElement("button");
                    input2.style.position = "relative";
                    input2.innerText = "删除";
                    input2.style.top = "100px";
                    input2.style.left = "50px";
                    input2.style.width = "70px";
                    input2.style.height = "34px";
                    input2.style.borderRadius = "10px";
                    input2.style.border = "0";
                    input2.style.backgroundColor = "yellow";
                    input2.style.fontSize = "18px";
                    input2.style.textAlign = "center";
                    input2.className = "delete" + i;
                    input2.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#ff6218";
                    }, true);
                    input2.addEventListener("mouseout", function () {
                        this.style.backgroundColor = "yellow";
                    });
                    if (arr3[i].isRented == 1) {
                        input2.disabled = 'disabled';
                    }
                    input2.onclick = function () {
                        var msg = confirm("确定要删除待租房屋的信息吗?");
                        if (msg) {
                            var landlordId = " ", roomId = " ";
                            for (var i = 0; i < arr3.length; i++) {
                                if (this.className == "delete" + i) {
                                    landlordId = arr3[i].landlordId;
                                    roomId = arr3[i].roomId;
                                    break;
                                }
                            }
                            $.ajax({
                                url: '../deleteLandlord',
                                type: 'post',
                                data: {'landlordId': landlordId, 'roomId': roomId},
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
                    div.appendChild(input2);
                    body.appendChild(div);
                }
            }
        },
        error: function () {
            alert("Error!!!");

            //for update
            arr3 = [{}];
            var body = document.getElementsByClassName("body3")[0];
            if (arr3.length == 0) {
                alert("您还没有上传住房信息！！！");
            } else {
                for (var i = 0; i < arr3.length; i++) {
                    var div = document.createElement("div");
                    div.style.fontSize = "20px";
                    div.style.position = "absolute";
                    div.style.width = "30%";
                    div.style.height = "860px";
                    var j = parseInt(i / 3);
                    div.style.top = 130 + 900 * j + "px";
                    div.style.left = (i % 3) * 30 + (i % 3 + 1) * 3 + "%";
                    div.style.borderRadius = "15px";
                    div.style.backgroundColor = " #8b98ff";
                    div.style.textAlign = "center";
                    var div3 = document.createElement("div");
                    div3.style.position = "relative";
                    div3.style.top = "2%";
                    div3.innerHTML = "出租房描述<br>";
                    var div3Textarea = document.createElement("textarea");
                    div3Textarea.rows = "6";
                    div3Textarea.cols = "60";
                    div3Textarea.style.fontSize = "18px";
                    div3Textarea.style.height = "100px";
                    div3Textarea.style.width = "80%";
                    div3Textarea.style.borderRadius = "10px";
                    div3Textarea.className = "des" + i;
                    div3Textarea.value = arr3[i].des;
                    div3.appendChild(div3Textarea);
                    div.appendChild(div3);
                    var div1 = document.createElement("div");
                    var insertText = document.createTextNode("房型 ");
                    div1.style.position = "relative";
                    div1.style.top = "5%";
                    var div1Input = document.createElement("input");
                    div1Input.type = "text";
                    div1Input.value = arr3[i].roomType;
                    div1Input.className = "roomType" + i;
                    var div1Input02 = document.createElement("input");
                    var insertText02 = document.createTextNode("  房屋租金 ");
                    div1Input02.type = "text";
                    div1Input02.value = arr3[i].rent;
                    div1Input02.className = "rent" + i;
                    div1.appendChild(insertText);
                    div1.appendChild(div1Input);
                    div1.appendChild(insertText02);
                    div1.appendChild(div1Input02);
                    div.appendChild(div1);
                    var div2 = document.createElement("div");
                    var insertText03 = document.createTextNode("地址 ");
                    div2.style.position = "relative";
                    div2.style.top = "8%";
                    div2.appendChild(insertText03);
                    var div2Input = document.createElement("input");
                    div2Input.type = "text";
                    div2Input.value = arr3[i].addr;
                    div2Input.className = "addr" + i;
                    div2.appendChild(div2Input);
                    var insertText04 = document.createTextNode("  房客上限 ");
                    div2.style.position = "relative";
                    div2.style.top = "8%";
                    div2.appendChild(insertText04);
                    var div2Input02 = document.createElement("input");
                    div2Input02.type = "text";
                    div2Input02.value = arr3[i].addr;
                    div2Input02.className = "maxRenter" + i;
                    div2.appendChild(div2Input02);
                    div.appendChild(div2);
                    var div4 = document.createElement("div");
                    div4.innerHTML = "展示图片<br>";
                    div4.style.position = "relative";
                    div4.style.top = "11%";
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
                    input1.innerText = "修改";
                    input1.style.position = "relative";
                    input1.style.top = "100px";
                    input1.style.left = "-40px";
                    input1.style.width = "70px";
                    input1.style.height = "34px";
                    input1.style.border = "0";
                    input1.style.borderRadius = "10px";
                    input1.style.backgroundColor = "yellow";
                    input1.style.fontSize = "18px";
                    input1.style.textAlign = "center";
                    input1.readOnly = "readonly";
                    input1.className = "update" + i;
                    input1.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#ff6218";
                    }, true);
                    input1.addEventListener("mouseout", function () {
                        this.style.backgroundColor = "yellow";
                    }, true);
                    input1.onclick = function () {
                        var msg = confirm("是否确定修改?");
                        if (msg) {
                            var roomType = " ", rent = " ", des = " ", maxRenter = "", addr = " ", roomId = " ";
                            for (var i = 0; i < arr3.length; i++) {
                                if (this.className == ("update" + i)) {
                                    roomType = document.getElementsByClassName("roomType" + i)[0];
                                    rent = document.getElementsByClassName("rent" + i)[0];
                                    maxRenter = document.getElementsByClassName("maxRenter" + i)[0];
                                    des = document.getElementsByClassName("des" + i)[0];
                                    addr = document.getElementsByClassName("addr" + i)[0];
                                    roomId = arr3[i].roomId;
                                }
                            }
                            $.ajax({
                                url: '../landlordUpdate',
                                type: 'post',
                                data: {
                                    'roomType': roomType.value,
                                    'rent': rent.value,
                                    'des': des.value,
                                    'addr': addr.value,
                                    'maxRenter': maxRenter.value,
                                    'roomId': roomId
                                },
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
                    if (arr3[i].isRented == 1) {
                        input1.disabled = "disabled";
                    }
                    div.appendChild(input1);
                    var input2 = document.createElement("button");
                    input2.style.position = "relative";
                    input2.innerText = "删除";
                    input2.style.top = "100px";
                    input2.style.left = "50px";
                    input2.style.width = "70px";
                    input2.style.height = "34px";
                    input2.style.borderRadius = "10px";
                    input2.style.border = "0";
                    input2.style.backgroundColor = "yellow";
                    input2.style.fontSize = "18px";
                    input2.style.textAlign = "center";
                    input2.className = "delete" + i;
                    input2.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#ff6218";
                    }, true);
                    input2.addEventListener("mouseout", function () {
                        this.style.backgroundColor = "yellow";
                    });
                    if (arr3[i].isRented == 1) {
                        input2.disabled = 'disabled';
                    }
                    input2.onclick = function () {
                        var msg = confirm("确定要删除待租房屋的信息吗?");
                        if (msg) {
                            var landlordId = " ", roomId = " ";
                            for (var i = 0; i < arr3.length; i++) {
                                if (this.className == "delete" + i) {
                                    landlordId = arr3[i].landlordId;
                                    roomId = arr3[i].roomId;
                                    break;
                                }
                            }
                            $.ajax({
                                url: '../deleteLandlord',
                                type: 'post',
                                data: {'landlordId': landlordId, 'roomId': roomId},
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
                    div.appendChild(input2);
                    body.appendChild(div);
                }
            }
        }
    });
}

/**显示来自租客的请求**/
function choose4() {
    c4.style.backgroundColor = "darkblue";
    c4.style.color = "white";
    c1.style.backgroundColor = "lightblue";
    c1.style.color = "black";
    c2.style.backgroundColor = "lightblue";
    c2.style.color = "black";
    c3.style.backgroundColor = "lightblue";
    c3.style.color = "black";
    body4.style.display = 'block';
    body1.style.display = 'none';
    body2.style.display = 'none';
    body3.style.display = 'none';
    body.style.overflowY = "visible";
    header.style.position = 'absolute';
    showUserName.disabled = false;
    //显示并处理请求
    var contentTotal = document.getElementsByClassName("content01");
    if (contentTotal.length != 0) {
        console.log(contentTotal.length);
        var wrapTemp = document.getElementsByClassName("wrap")[0];
        wrapTemp.innerHTML = "";
    }
    $.ajax({
        url: '../renting',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (data[0].num == 0) {
                var noRequest = document.getElementsByClassName("noRequest")[0];
                noRequest.style.display = "block";
            } else {
                for (var i = 1; i < data.length; i++) {
                    var content = document.createElement("div");
                    content.id = data[i].requestId;
                    content.className = "content01";
                    content.innerText = "用户 " + data[i].name + "发起租房请求，是否答应？(该用户联系方式：" + data[i].tel + ")";
                    var rentConfirm = document.createElement("button");
                    rentConfirm.className = "rentConfirm";
                    rentConfirm.innerText = "同意";
                    rentConfirm.onclick = requestAgree;
                    var rentReject = document.createElement("button");
                    rentReject.className = "rentReject";
                    rentReject.innerText = "拒绝";
                    rentReject.onclick = requestReject;
                    content.appendChild(rentConfirm);
                    content.appendChild(rentReject);
                    var wrap = document.getElementsByClassName("wrap")[0];
                    wrap.appendChild(content);
                }
            }
        },
        error: function () {
            alert("Error!!!");
        }
    });
}

//同意租房请求
function requestAgree() {
    var msg = confirm("是否确认同意该用户的租房请求？");
    if (msg) {
        var requestId = this.parentNode.id;
        $.ajax({
            url: '../agreeRequest',
            type: 'post',
            data: {"requestId": requestId},
            success: function () {
                alert("已同意该用户的租房请求！");
                location.reload(true);
            },
            error: function () {
                alert("Error!!!");
            }
        });
    }
}

//拒绝租房请求
function requestReject() {
    var msg = confirm("是否确认拒绝该用户的租房请求？");
    if (msg) {
        var requestId = this.parentNode.id;
        $.ajax({
            url: '../rejectRequest',
            type: 'post',
            data: {"requestId": requestId},
            success: function () {
                alert("已拒绝该用户的租房请求！");
                location.reload(true);
            }
        });
    }
}

/*****住房信息展示模块*****/
var arr = "";//存储服务器返回的展示信息
window.onload = function () {
    //背景
    background();
    //图片懒加载
    var observer = new IntersectionObserver(args=>{
        args.forEach((el)=>{
            if(el.intersectionRatio>0){
                el.target.style.background = el.target.getAttribute('imgURL');
                el.target.style.backgroundSize = '100% 100%';
                observer.unobserve(el.target);
            }
        })
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
                p.style.fontSize = "22px";
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
                div1.style.backgroundSize = "100% 100%";
                div1.setAttribute('defaultImg','url(../css/waiting.png)');
                div1.setAttribute('imgURL',"url(" + arr[i].photoPath + ")");
                observer.observe(div1);
                div.appendChild(div1);
            }

        },
        error: function () {
            alert("下载住房信息失败!");
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
    divParent.className = "divParent";
    divParent.style.overflow = 'auto';
    divParent.appendChild(divChild);
    var body1 = document.getElementsByClassName("body1")[0];
    for (var i = 0; i < arr.length; i++) {
        if (i == this.className) {
            var description = arr[i].des;
            var maxRenter = arr[i].maxRenter;
            var rent = arr[i].rent;
            var addr = arr[i].addr;
            var photoPath = arr[i].photoPath;
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
    var button2 = document.createElement("button");
    button2.style.position = "absolute";
    button2.style.fontSize = "18px";
    button2.style.backgroundColor = "#ffae7a";
    button2.style.border = "0";
    button2.style.height = "55px";
    button2.style.width = "100px";
    button2.style.left = "275px";
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

/*******上传住房信息模块********/
//打开封面之后关闭动画效果
var rightGate = document.getElementsByClassName("right_gate")[0];
var leftGate = document.getElementsByClassName("left_gate")[0];
var roomType = document.getElementsByClassName("roomType")[0];
var rent = document.getElementsByClassName("rent")[0];
var des = document.getElementsByClassName("inputDescription")[0];
var maxRenter = document.getElementsByClassName("maxRenter")[0];
var imageUpload = document.getElementById("imageUpload");
maxRenter.onclick = cancelAnimation;
rent.onclick = cancelAnimation;
roomType.onclick = cancelAnimation;
des.onclick = cancelAnimation;

function cancelAnimation() {
    rightGate.style.display = "none";
    leftGate.style.display = "none";
};

//上传住房信息成功提醒
function upload() {
    var msg = confirm("此次上传需要缴纳费用为￥50，是否确定上传住房信息？");
    if (msg) {
        if (tel.value == "" || inputTitle.value == "" || des.value == "" || show.value == "") {
            alert("输入内容不能为空！");
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

