const pwForgetSendEmail = require('../../dataOperation/pwForget/sendEmail').sendEmail;
const pwReset = require('../../dataOperation/pwForget/pwReset').pwReset;

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
    app.post('/pwForgetSendEmail', (req, res) => {
        postFun(req, res, pwForgetSendEmail);
    });

    //密码重设
    app.post('/pwReset', (req, res) => {
        postFun(req, res, pwReset);
    });
}

module.exports = {
    router
}