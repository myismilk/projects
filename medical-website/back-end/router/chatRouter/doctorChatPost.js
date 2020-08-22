const doctorGetAllMsg = require('../../dataOperation/chat/doctorGetAllMsg').doctorGetAllMsg;
const doctorGetContactList = require('../../dataOperation/chat/doctorGetContactList').doctorGetContactList;

const testDoctorSession = require('../../globalConfig').testDoctorSession;

router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';
    //获取历史访问医院列表
    app.post('/doctorGetAllMsg', (req, res) => {
        //session test
        if (!req.session.visitor) {
            req.session.visitor = testDoctorSession;
        }
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            let data = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                doctorGetAllMsg(data, resolve, req);
            });
            promise.then(message => {
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(message);
                res.end();
            });
        })
    })

    app.post('/doctorGetContactList', (req, res) => {
        //session test
        if (!req.session.visitor) {
            req.session.visitor = testDoctorSession;
        }
        let promise = new Promise((resolve, reject) => {
            doctorGetContactList(resolve, req);
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