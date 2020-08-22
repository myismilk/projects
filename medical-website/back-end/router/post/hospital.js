const formidable = require("formidable"); //处理文件
const fs = require("fs"); //文件操作
const conn = require('../../dataOperation/databaseConfig').connection;

const hosLogin = require('../../dataOperation/hospital/hosLogin').hosLogin;
const view = require('../../dataOperation/hospital/viewDoctorRegister').view;
const passOrNot = require('../../dataOperation/hospital/viewDoctorRegister').passOrNot;
const download = require('../../dataOperation/hospital/updateReservation').download;
const update = require('../../dataOperation/hospital/updateReservation').update;
const getReservationList = require('../../dataOperation/hospital/getReservationList').getList;
const getReservationListDetail = require('../../dataOperation/hospital/getReservationListDetail').getList;
const hosGetCommentList = require('../../dataOperation/hospital/getCommentList').hosGetCommentList;

const testHospitalSession = require('../../globalConfig').testHospitalSession;

routerWithData = (fun, req, res) => {
    //session test
    if (!req.session.visitor) {
        req.session.visitor = testHospitalSession;
    }
    let dataContainer = '';
    req.on('data', function (message) {
        dataContainer += message;
    });
    req.on('end', () => {
        let data = JSON.parse(dataContainer);
        let promise = new Promise((resolve, reject) => {
            fun(data, resolve, req);
        });
        promise.then(message => {
            res.writeHead(200, { 'Content-Type': "application/json" });
            res.write(message);
            res.end();
        });
    })
}

routerWithoutData = (fun, req, res) => {
    //session test
    if (!req.session.visitor) {
        req.session.visitor = testHospitalSession;
    }
    let promise = new Promise((resolve, reject) => {
        fun(resolve, req);
    });
    promise.then(message => {
        res.writeHead(200, { 'Content-Type': "application/json" });
        res.write(message);
        res.end();
    });
}

router = (app, dir) => {
    //静态资源根路径
    resourcePath = dir + '/public/';

    //医院登录
    app.post('/hosLogin', (req, res) => {
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            //console.log(dataContainer);
            let loginData = JSON.parse(dataContainer);
            let promise = new Promise((resolve, reject) => {
                hosLogin(loginData, resolve, req);
            });
            promise.then(message => {
                res.writeHead(200, { 'Content-Type': "text/plain" });
                res.write(message);
                res.end();
            });

        })
    });

    //医院操作
    //返回前端审核医生注册信息
    app.post('/viewDoctorRegister', (req, res) => {
        routerWithoutData(view, req, res);
    });

    //决定医生审核是否通过
    app.post('/passOrNot', (req, res) => {
        routerWithData(passOrNot, req, res);
    });

    //更新医生出诊安排
    //前端拉取数据
    app.post('/updateReservationdownload', (req, res) => {
        routerWithData(download, req, res);
    });

    //更新
    app.post('/updateReservationUpdate', (req, res) => {
        routerWithData(update, req, res);
    });


    //医院介绍信息更新
    app.post('/hosInfoUpdate', (req, res) => {
        if (!req.session.visitor) {
            req.session.visitor = testHospitalSession;
        }
        let visitor = req.session.visitor;
        let hosId = String(visitor.id);
        let time = String(new Date().getTime());
        let imgName = hosId + time + '.jpg';
        var form = new formidable.IncomingForm();
        let savePath = "img/hosInfo/" + imgName;
        let uploadDir = resourcePath + savePath;//设置文件名字及上传目录
        let des = '', contact = '';
        let returnInfo = '信息更新成功!';

        form.parse(req, function (err, fields, files) {
            des = fields.des;
            contact = fields.contact;
            fs.writeFileSync(uploadDir, fs.readFileSync(files.file.path));
            let sql = "update hosInfo set photoPath=\'" + savePath + "\',des=\'" + des + "\', contact=\'" + contact + "\' where hosId=" + hosId;
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

    //获取科室预约信息
    app.post('/hosGetReservationList', (req, res) => {
        routerWithData(getReservationList, req, res);
    });


    //获取科室预约详细信息
    app.post('/hosGetReservationListDetail', (req, res) => {
        routerWithData(getReservationListDetail, req, res);
    });

    //获取医院评论列表
    app.post('/hosGetCommentList', (req, res) => {
        routerWithoutData(hosGetCommentList, req, res);
    });

    //医院上传检查结果
    app.post('/hosUploadResult', (req, res) => {
        if (!req.session.visitor) {
            req.session.visitor = testHospitalSession;
        }
        let visitor = req.session.visitor;
        let hosId = String(visitor.id);
        let time = String(new Date().getTime());
        let imgName = hosId + time + '.jpg';
        var form = new formidable.IncomingForm();
        let savePath = "img/userResult/" + hosId + "/";
        try {
            fs.statSync(resourcePath + savePath);
        } catch (e) {
            fs.mkdir(resourcePath + savePath, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        savePath += imgName;
        let uploadDir = resourcePath + savePath;//设置文件名字及上传目录
        let title = '', introduce = '', idNum;
        let returnInfo = '信息上传成功!';

        form.parse(req, function (err, fields, files) {
            title = fields.title;
            introduce = fields.introduce;
            idNum = fields.idNum;
            fs.writeFileSync(uploadDir, fs.readFileSync(files.file.path));
            let sql = "insert into result(idNum,hosId,resultPath,title,des) values " +
                "(\'" + idNum + "\'," + hosId + ",\'" + savePath + "\',\'" + title + "\',\'" + introduce + "\')";
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    returnInfo = '信息上传失败,请检查身份证号是否输入正确!';
                }
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(JSON.stringify({ message: returnInfo }));
                res.end();
            })
        });
    });
}

module.exports = {
    router
}