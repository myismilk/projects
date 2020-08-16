/**撤销登录状态*/
function offLine() {
    var msg = confirm("是够确定返回大厅?");
    if (msg) {
        return true;
    } else {
        return false;
    }
}

var roomId = "";

/*点击上传文件*/
var chooseFile = document.getElementsByClassName("chooseFile")[0];
var uploadFile = document.getElementById("uploadFile");
chooseFile.onclick = clickUploadFile;
uploadFile.onchange = fileUpload;

function clickUploadFile() {
    uploadFile.click();
}

function fileUpload() {
    roomId = getroomId();
    var fileObj = document.getElementById("uploadFile").files[0]; // 获取文件对象
    var FileController = "../receiveFile"; // 接收上传文件的后台地址
    if (fileObj) {
        //alert(fileObj);
        // FormData 对象
        var form = new FormData();
        form.append("file", fileObj);// 文件对象
        form.append("roomId", roomId);
        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function () {
            //alert(xhr.responseText);
        };
        xhr.send(form);

    } else {
        alert("未选择文件");
    }
}


window.onload = function () {
    /**加载背景动画**/
    background();

    /*系统提示欢迎进入聊天室*/
    roomId = getroomId();
    $.ajax({
        url: '../welcome',
        type: 'post',
        async: false,
        data: {"roomId": roomId},
        success: function () {
        },
        error: function () {
            alert("Error!!!!");
        }
    });
    welcome();
    /**显示成员列表**/
    showMember();

    /**显示聊天记录*/
    showMessage();
    setInterval(showMember, 2000);
    setInterval(showMessage, 2000);
};

function welcome() {
    var userName = getUserName();

    function getUserName() {
        var url = window.location.href;
        var reg = new RegExp('[?&]' + "nickName=" + '([^&#]+)');
        var result = url.match(reg);
        return result ? result[1] : null;
    }
}

function showMember() {
    roomId = getroomId();
    $.ajax({
        url: '../getMemberList',
        type: 'post',
        dataType: 'json',
        data: {"roomId": roomId},
        success: function (data) {
            var memList = document.getElementsByClassName("list")[0];
            memList.innerHTML = "<p class=\"header\">聊天室成员</p>";
            for (var i = 0; i < data.length; i++) {
                var temp = document.createElement("p");
                temp.id = data[i].id;
                if (data[i].isOnline === "true") {
                    temp.className = "online";
                } else {
                    temp.className = "offline";
                }
                temp.innerText = data[i].nickName;
                temp.onclick = userShowInfo;
                memList.appendChild(temp);
            }
        },
        error: function () {
            alert("Error!!!");
        }
    });
}

var temp = "";
var lastMessage = -1;

function showMessage() {
    roomId = getroomId();
    $.ajax({
        url: '../getMsg',
        type: 'post',
        dataType: 'json',
        data: {"roomId": roomId, "lastMessage": lastMessage},
        success: function (data) {
            //console.log(data.length+" "+temp.length);
            var lastId = data[data.length - 1].lastMessage;
            var tag = true;
            if (lastMessage == -1 || lastMessage < lastId) {
                lastMessage = lastId;
            } else if (lastMessage == lastId) {
                return;
            }

            //if (temp.length != data.length) {
            var showRegion = document.getElementsByClassName("showRegion")[0];
            for (var i = 0; i < data.length - 1; i++) {
                if (data[i].toUser !== "你" && data[i].fromUser !== "你" && data[i].fromUser !== "系统" && data[i].toUser !== "download" && data[i].toUser !== "public") {
                    continue;
                }
                var div = document.createElement("div");
                var content01 = document.createElement("div");
                content01.className = "content01";
                if (data[i].fromUser === "系统") {
                    div.innerText = "系统提示:";
                } else if (data[i].toUser === "download") {
                    div.innerText = data[i].fromUser + "上传了文件: ";
                    div.className = "public";
                } else if (data[i].toUser !== "public") {
                    div.innerText = data[i].fromUser + "对" + data[i].toUser + "说: ";
                    div.className = "public";
                } else {
                    div.innerText = data[i].fromUser + "说: ";
                    div.className = "public";
                }

                if (data[i].toUser === "download") {
                    var realPath = data[i].msg.toString().split("+")[0];
                    var showName = data[i].msg.toString().split("+")[1];
                    //console.log(realPath+" "+showName);
                    content01.innerHTML = "<a href='" + realPath + "' download='" + showName + "'>" + showName + " 点击下载</a>";
                } else if (data[i].toUser !== "public") {
                    content01.innerHTML = data[i].msg.split(":")[1];
                } else {
                    content01.innerHTML = data[i].msg;
                }

                div.appendChild(content01);
                showRegion.appendChild(div);
                showRegion.scrollTop = showRegion.scrollHeight;
            }
            //console.log(temp);
            //}
        },
        error: function () {
            alert("dd Error!!!");
        }
    });
}

/**获取当前roomId*/
function getroomId() {
    var url = window.location.href;
    var reg = new RegExp('[?&]' + "roomId=" + '([^&#]+)');
    var result = url.match(reg);
    return result ? result[1] : null;
}

/*发送消息*/
var sendMsg = document.getElementsByClassName("send")[0];
sendMsg.onclick = send;

function send() {
    var inputArea = document.getElementsByClassName("inputArea")[0];
    roomId = getroomId();
    $.ajax({
        url: '../sendMsg',
        type: 'post',
        data: {"roomId": roomId, "inputArea": inputArea.value, "toId": toId},
        success: function () {
            showMessage();
            inputArea.value = "";
        },
        error: function () {
            alert("Error!!!");
        }
    });
}
