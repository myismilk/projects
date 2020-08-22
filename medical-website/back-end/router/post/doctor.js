const formidable = require("formidable"); //处理文件
const fs = require("fs"); //文件操作
const conn = require('../../dataOperation/databaseConfig').connection;
const getList = require('../../dataOperation/doctor/doctorGetReservationList').getList;
const reservationDone = require('../../dataOperation/doctor/reservationDone').reservationDone;

const testDoctorSession = require('../../globalConfig').testDoctorSession;

router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';

    //医生介绍信息更新
    app.post('/doctorInfoUpdate', (req, res) => {
        if (!req.session.visitor) {
            req.session.visitor = testDoctorSession;
        }
        let visitor = req.session.visitor;
        let doctorId = String(visitor.id);
        let time = String(new Date().getTime());
        let imgName = doctorId + time + '.jpg';
        let form = new formidable.IncomingForm();
        let savePath = "img/doctorInfo/" + imgName;
        let uploadDir = resourcePath + savePath;//设置文件名字及上传目录
        let des = '', contact = '';
        let returnInfo = '信息更新成功!';

        form.parse(req, function (err, fields, files) {
            des = fields.des;
            contact = fields.contact;
            fs.writeFileSync(uploadDir, fs.readFileSync(files.file.path));
            let sql = "update doctorInfo set picPath=\'" + savePath + "\',des=\'" + des + "\', contact=\'" + contact + "\' where doctorId=" + doctorId;
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err.message);
                    returnInfo = '信息更新失败,刷新后重试!';
                }
                res.writeHead(200, { 'Content-Type': "text/plain" });
                res.write(returnInfo);
                res.end();
            })
        });
    });

    //获取某天预约信息
    app.post('/doctorGetReservationList', (req, res) => {
        if (!req.session.visitor) {
            req.session.visitor = testDoctorSession;
        }
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            //console.log(dataContainer);
            let data = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                getList(data, resolve, req);
            });
            promise.then((message) => {
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(message)
                res.end();
            });
        })
    });

    //确认预约完成
    app.post('/reservationDone', (req, res) => {
        if (!req.session.visitor) {
            req.session.visitor = testDoctorSession;
        }
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            //console.log(dataContainer);
            let data = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                reservationDone(data, resolve, req);
            });
            promise.then((message) => {
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(message)
                res.end();
            });
        })
    });
}

module.exports = {
    router
}