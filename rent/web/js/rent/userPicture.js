var userName = document.getElementsByClassName("userName")[0];
userName.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#5fffc8";
}, true);
userName.addEventListener("mouseout", function () {
    this.style.backgroundColor = "#bfff82";
}, true);
userName.onclick = userShowInfo;

//设置弹出框
function userShowInfo() {
    var body = document.getElementById("body");
    //var divParent = document.createElement("divParent");
    var divChild = document.createElement("div");
    var divParent = document.createElement("div");
    divParent.className = "userDivParent";
    divChild.className = "userShowInfo";
    var title = document.createElement("p");
    title.innerText = "更改用户头像";
    title.style.textAlign = "center";
    title.style.fontSize = "22px";
    divChild.appendChild(title);
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
    var form = document.getElementById("usrePicForm");
    var input = document.getElementsByClassName("userFileinput")[0];
    if (input.value == "") {
        alert("请选择上传图片！");
        return false;
    } else {
        var data = new FormData($("#userPicForm")[0]);
        $.ajax({
            url: '../uploadUserPicture',
            type: 'post',
            data: data,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                location.reload(true);
            },
            error: function () {
                alert("Error!!!");
            }
        });
        return true;
    }
}