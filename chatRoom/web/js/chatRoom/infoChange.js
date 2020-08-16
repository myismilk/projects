var userName = document.getElementsByClassName("userName")[0];
userName.onclick = userShowInfo;

//设置弹出框
function userShowInfo() {
    var nickName = "";
    var signature = "";
    /*展示信息*/
    $.ajax({
        url: '../showInfo',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            nickName = data.nickName;
            signature = data.signature;
            var body = document.getElementById("body");
            //var divParent = document.createElement("divParent");
            var divChild = document.createElement("div");
            var divParent = document.createElement("div");
            divParent.className = "userDivParent";
            divChild.className = "userShowInfo";
            divChild.style.textAlign = "center";
            var title = document.createElement("p");
            title.innerText = "修改个人信息";
            title.style.fontSize = "22px";
            divChild.appendChild(title);
            var changeNickName = document.createElement("div");
            changeNickName.innerText = "修改昵称: ";
            changeNickName.style.fontSize = "20px";
            var inputNickName = document.createElement("input");
            inputNickName.name = "inputNickName";
            inputNickName.id = "inputNickName";
            inputNickName.value = nickName;
            changeNickName.appendChild(inputNickName);
            divChild.appendChild(changeNickName);
            var changeSignature = document.createElement("div");
            changeSignature.style.marginTop = "20px";
            changeSignature.style.fontSize = "20px";
            changeSignature.innerHTML = "修改个性签名<br>";
            var textareaSignature = document.createElement("textarea");
            textareaSignature.className = "textareaSignature";
            textareaSignature.name = "textareaSignature";
            textareaSignature.value = signature;
            changeSignature.appendChild(textareaSignature);
            divChild.appendChild(changeSignature);
            var picDiv = document.createElement("div");
            picDiv.className = "userPicDiv";
            divChild.appendChild(picDiv);
            var button1 = document.createElement("button");
            button1.className = "userUploadPic";
            button1.innerText = "选择图片";
            button1.type = "button";
            divChild.appendChild(button1);
            var button2 = document.createElement("div");
            button2.className = "userReturn";
            button2.innerText = "返回";
            button2.onclick = function () {
                divChild.style.display = "none";
                divParent.style.display = "none";
            };
            divChild.appendChild(button2);
            var form = document.createElement("form");
            form.id = "userPicForm";
            form.action = "uploadUserPicture";
            form.method = "post";
            form.enctype = "multipart/form-data";
            var input = document.createElement("input");
            input.id = "userImageUpload";
            input.className = "userFileinput";
            input.type = "file";
            input.name = "userPictureUpload";
            input.onchange = userreadAsDataURL;
            button1.onclick = function () {
                input.click();
            };
            button1.appendChild(input);
            var upload = document.createElement("button");
            upload.type = "button";
            upload.innerText = "上传";
            upload.className = "userUpload";
            upload.onclick = userUpload;
            divChild.appendChild(upload);
            form.appendChild(divChild);
            divParent.appendChild(form);
            body.appendChild(divParent);
        },
        error: function () {

        }
    });

}

// 将文件以Data URL形式进行读入页面
function userreadAsDataURL() {
    var picture = document.getElementsByClassName("userPicDiv")[0];
    // 检查是否为图像类型
    var simpleFile = document.getElementById("userImageUpload").files[0];
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

//上传表单
function userUpload() {
    var input = document.getElementById("inputNickName");
    if (input.value == "") {
        alert("昵称不能为空！");
        return false;
    } else {
        var data = new FormData($("#userPicForm")[0]);
        $.ajax({
            url: '../infoChange',
            type: 'post',
            data: data,
            processData: false,
            contentType: false,
            success: function (data) {
                location.reload(true);
            },
            error: function () {
                alert("Error!!!");
            }
        });
        return true;
    }
}