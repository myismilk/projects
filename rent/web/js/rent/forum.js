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

/***设置pageup的返回地址***/
var url = document.location.href;
var userName = getQueryByName(url, "loginName");


function getQueryByName(url, name) {
    var reg = new RegExp('[?&]' + name + '=([^&#]+)');
    var query = url.match(reg);
    return query ? query[1] : null;
}

function ajaxPromise(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', "application/json;charset=utf-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(this.responseText));
        } else {
            reject('error!');
        }
    }
    xhr.send();
});
}

window.onload = function () {
    /**生成气泡的背景动画**/
    var body = document.getElementsByTagName("body")[0];
    body.style.overflowY = "hidden";
    var arrReply = "";
    var arr;
    var ulArr = [];//存储每一楼
    var promise01 = ajaxPromise('../forum');
    promise01.then(val => {
        arr = val;
    for (var i = 0; i < arr.length; i++) {
        //显示论坛回复信息
        var test = document.createElement("div");
        var tempId = arr[i].floorId;
        test.id = tempId.trim();
        test.className = "test";
        var user = document.createElement("div");
        user.className = "user";
        var picture = document.createElement("picture");
        picture.className = "picture1";
        if (arr[i].userPicture != 'empty') {
            picture.style.background = "url(" + arr[i].userPicture + ")";
            picture.style.backgroundSize = "100% 100%";
        }
        var user1Name = document.createElement("p");
        user1Name.className = "user1Name";
        user1Name.innerText = arr[i].username;
        var floorTip = document.createElement("p");
        floorTip.className = "floorTip";
        floorTip.innerText = i + 1 + "楼";
        user.appendChild(picture);
        user.appendChild(user1Name);
        user.appendChild(floorTip);
        test.appendChild(user);
        var content = document.createElement("div");
        content.className = "content";
        var ul = document.createElement("ul");
        ulArr.push(ul);
        var text = document.createElement("li");
        text.className = "text";
        text.innerText = arr[i].msg;
        ul.appendChild(text);

        content.appendChild(ul);
        test.appendChild(content);
        var body = document.getElementsByClassName("body")[0];
        body.appendChild(test);
    }

    var comment = document.createElement("div");
    comment.className = "comment";
    var title = document.createElement("div");
    title.className = "title";
    title.innerText = "我也说一句:";
    var commentContent = document.createElement("textarea");
    commentContent.className = "commentContent";
    var button = document.createElement("button");
    button.className = "submitComment";
    button.innerText = "发表";
    button.onclick = uploadComment;
    var cleanUp = document.createElement("button");
    cleanUp.className = "cleanUp";
    cleanUp.innerText = "重置";
    cleanUp.onclick = reset;
    comment.appendChild(title);
    comment.appendChild(commentContent);
    var tempDiv = document.createElement("div");
    tempDiv.appendChild(button);
    tempDiv.appendChild(cleanUp);
    comment.appendChild(tempDiv);
    body.appendChild(comment);
    return ajaxPromise('../getReply');
}).then(val => {
        arrReply = val;
    //显示对当前楼层的所有回复消息
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arrReply.length; j++) {
            if (arrReply[j].floorId === arr[i].floorId) {
                var replyer = document.createElement("li");
                replyer.className = "replyer";
                var em = document.createElement("em");
                em.className = "replyUsername";
                em.innerText = arrReply[j].username;
                em.style.display = "inline";
                replyer.appendChild(em);
                var p = document.createElement("p");
                p.style.display = "inline";
                p.innerText = " : " + arrReply[j].msg;
                replyer.appendChild(p);
                ulArr[i].appendChild(replyer);
            }


        }
        var response = document.createElement("li");
        response.className = "response";
        response.innerText = "回复";
        response.onclick = showReply;
        ulArr[i].appendChild(response);

        //回复楼层
        var temp = document.createElement("li");
        temp.className = "temp";
        var tempTextarea = document.createElement("textarea");
        var replyConfirm = document.createElement("button");
        var cancel = document.createElement("button");
        tempTextarea.className = "tempTextarea";
        replyConfirm.className = "replyConfirm";
        cancel.className = "cancel";
        replyConfirm.innerText = "确认回复";
        replyConfirm.onclick = uploadReply;
        cancel.innerText = "取消";
        cancel.onclick = function () {
            var t = this.parentNode.parentNode.lastChild;
            t.style.display = "none";
        };
        temp.appendChild(tempTextarea);
        temp.appendChild(replyConfirm);
        temp.appendChild(cancel);
        temp.style.display = "none";
        ulArr[i].appendChild(temp);
    }
});
};

/**显示上传回复信息框*/
function showReply() {
    var temp = document.getElementsByClassName("temp");
    for (var i = 0; i < temp.length; i++) {
        temp[i].style.display = "none";
    }
    var currentTemp = this.parentNode.lastChild;
    currentTemp.style.display = "block";
    var body = document.getElementsByClassName("body")[0];
    body.style.height = "88%";
}

/*上传回复信息*/
function uploadReply() {
    var floor = this.parentNode.parentNode.parentNode.parentNode;
    var floorId = floor.id;
    var commentContent = this.parentNode.firstChild;
    var msg = commentContent.value;
    //console.log(floorId);
    //console.log(msg);
    if (msg == "") {
        alert("回复内容不能为空！");
    } else {
        $.ajax({
            url: '../uploadReply',
            type: 'post',
            data: { 'msg': msg, 'floorId': floorId },
            success: function (data) {
                location.reload(true);
            },
            error: function () {
                alert("Error!!!");
            }
        });
    }
}


/***上传评论信息**/
function uploadComment() {
    var msg = confirm("确定提交评论?");
    if (msg) {
        var commentText = document.getElementsByClassName("commentContent")[0];
        var strComment = commentText.value;
        strComment = strComment.replace(/[ ]/g, "");
        strComment = strComment.replace(/[\r\n]/g, "");
        if (strComment == "") {
            alert("评论内容不能为空！");
        }
        else {
            $.ajax({
                url: '../uploadComment',
                type: 'post',
                data: { "commentContent": strComment },
                success: function () {
                    //commentText.value = "";
                    location.reload(true);
                },
                error: function () {
                    alert("upload error!!!");
                }
            });
        }
    }
}

//重置评论框
function reset() {
    var msg = confirm("确定重置评论内容吗?");
    if (msg) {
        var commentContent = document.getElementsByClassName("commentContent")[0];
        commentContent.value = "";
    }
}

