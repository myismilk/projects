const userGetAllMsg = require('../../dataOperation/chat/userGetAllMsg').userGetAllMsg;
const userGetContactList = require('../../dataOperation/chat/userGetContactList').userGetContactList;

const testUserSession = require('../../globalConfig').testUserSession;

router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';
    //获取历史访问医院列表
    app.post('/userGetAllMsg', (req, res) => {
        //session test
        if (!req.session.visitor) {
            req.session.visitor = testUserSession;
        }
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            let data = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                userGetAllMsg(data, resolve, req);
            });
            promise.then(message => {
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(message);
                res.end();
            });
        })
    })

    app.post('/userGetContactList', (req, res) => {
        //session test
        if (!req.session.visitor) {
            req.session.visitor = testUserSession;
        }
        let promise = new Promise((resolve, reject) => {
            userGetContactList(resolve, req);
        });
        promise.then(message => {
            res.writeHead(200, { 'Content-Type': "application/json" });
            res.write(message);
            res.end();
        });
    })
}

module.exports = {
    router
}