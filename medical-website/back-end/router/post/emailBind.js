const sendEmail = require('../../dataOperation/emailBind/sendEmail').sendEmail;
const emailBind = require('../../dataOperation/emailBind/bind').emailBind;

postFun = (req, res, fn) => {
    let dataContainer = '';
    req.on('data', function (message) {
        dataContainer += message;
    });
    req.on('end', () => {
        //console.log(dataContainer);
        let data = JSON.parse(dataContainer);
        let promise = new Promise((resolve, reject) => {
            fn(data, resolve, req);
        });
        promise.then((message) => {
            res.writeHead(200, { 'Content-Type': "application/json" });
            res.write(message)
            res.end();
        });
    })
}

router = (app, dir) => {
    //发送验证码
    app.post('/sendEmail', (req, res) => {
        postFun(req, res, sendEmail);
    });

    //邮箱绑定
    app.post('/emailBind', (req, res) => {
        postFun(req, res, emailBind);
    });
}

module.exports = {
    router
}