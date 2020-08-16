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


//设置退出提示
function exitConfirm() {
    var msg = confirm("是否确认退出？");
    if (msg) {
        return true;
    } else {
        return false;
    }
}


var allInfo = "";
/*****加载背景动画*****/
window.onload = function () {
    //背景动画
    background();
    var parent = document.getElementsByClassName("body1")[0];
    var temph = 0;
    $.ajax({
        url: '../downloadRooms',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            allInfo = data;
            /*设置头像显示*/
            var userPic = document.getElementsByClassName("picture")[0];
            userPic.style.background = "url(" + allInfo[allInfo.length - 1].picPath + ")";
            userPic.style.backgroundSize = "100% 100%";
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                var p = document.createElement("p");
                var roomName = "";
                if (i < data.length - 1)
                    roomName = data[i].roomName;
                else
                    roomName = "";
                var div1 = document.createElement("div");
                div1.id = data[i].roomId;
                var roomAuthor = document.createElement("p");
                var roomDes = document.createElement("p");
                var desContent = document.createElement("textarea");
                var enterRoom = document.createElement("button");
                var createRoom = document.createElement("p");
                var j = parseInt(i / 3);
                temph = j * 50;
                div.style.top = 450 * j + 30 + temph + "px";
                div.style.width = "27%";
                div.style.height = "600px";
                div.style.position = "absolute";
                div.style.left = 5 + 30 * (i % 3) + "%";
                div.style.textAlign = "center";
                div.style.fontSize = "22px";
                parent.appendChild(div);
                p.className = "roomTitle";
                p.innerHTML = roomName;
                div.appendChild(p);
                div1.style.height = "380px";
                div1.style.background = "lightblue";
                div1.style.borderRadius = "50px";
                div1.style.boxShadow = "0 0 10px gray";
                if (i < data.length - 1) {
                    roomAuthor.className = "roomAuthor";
                    roomAuthor.innerText = "房主: " + data[i].roomAuthor;
                    div1.appendChild(roomAuthor);
                    roomDes.innerText = "聊天室简介";
                    roomDes.className = "roomDes";
                    div1.appendChild(roomDes);
                    desContent.className = "desContent";
                    desContent.value = data[i].des;
                    desContent.readOnly = true;
                    div1.appendChild(desContent);
                    enterRoom.className = "enterRoom";
                    enterRoom.innerText = "进入聊天室";
                    enterRoom.onclick = enterFirst;
                    div1.appendChild(enterRoom);
                    if (data[data.length - 1].myId === data[i].id) {
                        var deleteRoom = document.createElement("button");
                        deleteRoom.className = "deleteRoom";
                        deleteRoom.innerText = "删除";
                        deleteRoom.onclick = deleteConfirm;
                        div1.appendChild(deleteRoom);
                    }
                    div.appendChild(div1);
                } else {
                    createRoom.innerText = "创建一个聊天室？";
                    createRoom.className = "createRoom";
                    createRoom.onclick = createChatRoom;
                    div1.appendChild(createRoom);
                    div.appendChild(div1);
                }
            }
        },
        error: function () {
            alert("Error!!!");
        }
    });
};

/**删除聊天室*/
function deleteConfirm() {
    var msg = confirm("是否确认删除聊天室？(该操作不可逆)");
    if (msg) {
        var msg2 = confirm("再次确认删除聊天室？");
        if (msg2) {
            var roomId = this.parentNode.id;
            $.ajax({
                url: '../deleteRoom',
                type: 'post',
                data: {"roomId": roomId},
                success: function () {
                    alert("聊天室已经成功删除！");
                    location.reload(true);
                },
                error: function () {
                    alert("Error!!!");
                }
            });
        }
    }
}

var num = "";
/*进入聊天室*/
var backgroundDiv02 = document.getElementsByClassName("backgroundDiv02")[0];

function enterFirst() {
    backgroundDiv02.style.display = "block";
    num = this.parentNode.id;
}

function cancelEnter() {
    backgroundDiv02.style.display = "none";
}

function enterChatRoom() {
    var roomPassword02 = document.getElementsByClassName("roomPassword02")[0];
    $.ajax({
        url: '../enterChatRoom',
        type: 'post',
        data: {"roomPassword": roomPassword02.value, "roomId": num},
        success: function (data) {
            if (data === "false") {
                alert("邀请码错误，请重新输入！");
            } else {
                window.location = data;
            }
        },
        error: function () {
            alert("Error!!!");
        }
    });
}

/*****创建聊天室*****/
function createChatRoom() {
    var backgrondDiv = document.getElementsByClassName("backgroundDiv")[0];
    backgrondDiv.style.display = "block";
}

/*创建聊天室确认*/
function createConfirm() {
    var roomName = document.getElementsByClassName("roomName")[0];
    var roomPassword = document.getElementsByClassName("roomPassword")[0];
    if (roomName.value === "") {
        alert("聊天室名称不能为空！！！");
        return false;
    } else if (roomPassword.value === "") {
        alert("聊天室邀请码不能为空！！！");
        return false;
    } else {
        var msg = confirm("是否确认创建聊天室？");
        if (msg) {
            return true;
        } else {
            return false;
        }
    }
}


//更新信息
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

