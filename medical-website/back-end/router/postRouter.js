const hospitalPostRouter = require('./post/hospital').router;
const userPostRouter = require('./post/user').router;
const doctorPostRouter = require('./post/doctor').router;
const userChatPostRouter = require('./chatRouter/userChatPost').router;
const doctorChatPostRouter = require('./chatRouter/doctorChatPost').router;
const emailBindRouter = require('./post/emailBind').router;
const pwForgetRouter = require('./post/pwForget').router;
const register = require('../dataOperation/register').register;
const pwChange = require('../dataOperation/pwChange').pwChange;
const login = require('../dataOperation/login').login;


router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';

    //注册
    app.post('/register', (req, res) => {
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            //console.log(dataContainer);
            let registerData = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                register(registerData, resolve);
            });
            promise.then(message => {
                res.writeHead(200, { 'Content-Type': "text/plain" });
                res.write(message);
                res.end();
            });

        })
    });

    //登录
    app.post('/login', (req, res) => {
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            //console.log(dataContainer);
            let loginData = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                login(loginData, resolve, req);
            });
            promise.then(message => {
                res.writeHead(200, { 'Content-Type': "text/plain" });
                res.write(message);
                res.end();
            });

        })
    });

    //密码修改
    app.post('/pwChange', (req, res) => {
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            //console.log(dataContainer);
            let data = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                pwChange(data, resolve, req);
            });
            promise.then(message => {
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(message);
                res.end();
            });

        })
    });

    pwForgetRouter(app, dir);
    emailBindRouter(app, dir);
    userPostRouter(app, dir);
    hospitalPostRouter(app, dir);
    doctorPostRouter(app, dir);
    userChatPostRouter(app, dir);
    doctorChatPostRouter(app, dir);
}

module.exports = {
    router
}