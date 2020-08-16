
//设置弹出框
var toId = 0;
var nickName = "";
var signature = "";
var id="";
function userShowInfo() {
    /*展示信息*/
    id = this.id;
    $.ajax({
        url: '../viewUserInfo',
        type: 'post',
        dataType: 'json',
        data:{"id":id},
        success: function (data) {
            nickName = data.nickName;
            signature = data.signature;
            var body = document.getElementsByTagName("body")[0];
            //var divParent = document.createElement("divParent");
            var divChild = document.createElement("div");
            var divParent = document.createElement("div");
            divParent.className = "userDivParent";
            divParent.style.height = "95%";
            divParent.style.zIndex ="2";
            divChild.className = "userShowInfo";
            divChild.style.textAlign = "center";
            divChild.style.height = "600px";
            var title = document.createElement("p");
            title.innerText = "个人信息";
            title.style.fontSize = "22px";
            divChild.appendChild(title);
            var changeNickName = document.createElement("div");
            changeNickName.innerText = "昵称: ";
            changeNickName.style.fontSize = "20px";
            var inputNickName = document.createElement("input");
            inputNickName.name = "inputNickName";
            inputNickName.id = "inputNickName";
            inputNickName.value = nickName;
            inputNickName.disabled = true;
            changeNickName.appendChild(inputNickName);
            divChild.appendChild(changeNickName);
            var changeSignature = document.createElement("div");
            changeSignature.style.marginTop = "20px";
            changeSignature.style.fontSize = "20px";
            changeSignature.innerHTML = "个性签名<br>";
            var textareaSignature = document.createElement("textarea");
            textareaSignature.className = "textareaSignature";
            textareaSignature.name = "textareaSignature";
            textareaSignature.value = signature;
            textareaSignature.disabled = true;
            changeSignature.appendChild(textareaSignature);
            divChild.appendChild(changeSignature);
            var picDiv = document.createElement("div");
            picDiv.className = "userPicDiv";
            picDiv.style.background = "url("+data.photoPath+")";
            picDiv.style.backgroundSize = "100% 100%";
            divChild.appendChild(picDiv);
            var button2 = document.createElement("div");
            button2.className = "userReturn";
            button2.innerText = "返回";
            button2.style.top = "15px";
            button2.style.left = "30%";
            button2.onclick = function () {
                divChild.style.display = "none";
                divParent.style.display = "none";
            };
            divChild.appendChild(button2);
            var button3 = document.createElement("div");
            button3.className = "userReturn";
            button3.innerText = "私聊";
            button3.style.top = "-25px";
            button3.style.left = "50%";
            button3.onclick = privateChat;
            divChild.appendChild(button3);
            divParent.appendChild(divChild);
            body.appendChild(divParent);
        },
        error: function () {
            alert("Error!!!");
        }
    });
}
function privateChat() {
    var inputArea = document.getElementsByClassName("inputArea")[0];
    toId = id;
    inputArea.value = "你对" + nickName + "说: ";
    this.parentNode.parentNode.style.display = "none";
}
