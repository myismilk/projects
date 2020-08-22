const getList = require('../../dataOperation/user/getDoctorList').getList;
const userVisitedHos = require('../../dataOperation/user/userVisitedHos').userVisitedHos;
const chooseHos = require('../../dataOperation/user/chooseHos').chooseHos;
const make = require('../../dataOperation/user/makeReservation').make;
const getListDetail = require('../../dataOperation/user/getDoctorListDetail').getList;
const getReservation = require('../../dataOperation/user/getReservationList').getList;
const cancelReservation = require('../../dataOperation/user/cancelReservation').cancelReservation;
const getHistoryHosList = require('../../dataOperation/user/getHistoryHosList').getHistoryHosList;
const chatGetDoctorList = require('../../dataOperation/user/chatGetDoctorList').getList;
const getReservationListDone = require('../../dataOperation/user/getReservationListDone').getList;
const uploadComment = require('../../dataOperation/user/uploadComment').uploadComment;
const userGetCommentList = require('../../dataOperation/user/userGetCommentList').userGetCommentList;
const userGetResultList = require('../../dataOperation/user/userGetResultList').userGetResultList;

const testUserSession = require('../../globalConfig').testUserSession;

routerWithData = (fun, req, res) => {
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
        req.session.visitor = testUserSession;
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

    //选择医院
    app.post('/chooseHos', (req, res) => {
        routerWithoutData(chooseHos, req, res);
    })

    //获取历史访问医院列表
    app.post('/getHistoryHosList', (req, res) => {
        routerWithoutData(getHistoryHosList, req, res);
    })


    //绑定hosId
    app.post('/bindHosId', (req, res) => {
        //session test
        if (!req.session.visitor) {
            req.session.visitor = testUserSession;
        }
        let visitor = req.session.visitor;
        let dataContainer = '';
        req.on('data', function (message) {
            dataContainer += message;
        });
        req.on('end', () => {
            let data = JSON.parse(dataContainer);
            let hosId = data.hosId;
            let userId = visitor.id;
            visitor.hosId = hosId;

            userVisitedHos(userId, hosId);
            res.writeHead(200, { 'Content-Type': "text/plain" });
            res.write('');
            res.end();
        })
    })

    //预约时获取医生列表
    app.post('/userGetDoctorList', (req, res) => {
        routerWithData(getList, req, res);
    });

    //选取医生预约
    app.post('/makeReservation', (req, res) => {
        routerWithData(make, req, res);
    });


    //获取科室详细医生信息
    app.post('/userGetDoctorListDetail', (req, res) => {
        routerWithData(getListDetail, req, res);
    });

    //获取预约信息
    app.post('/getReservationList', (req, res) => {
        routerWithoutData(getReservation, req, res);
    });

    //取消预约
    app.post('/cancelReservation', (req, res) => {
        routerWithData(cancelReservation, req, res);
    });

    //已完成预约列表
    app.post('/userGetReservationListDone', (req, res) => {
        routerWithoutData(getReservationListDone, req, res);
    });


    //上传评论
    app.post('/uploadComment', (req, res) => {
        routerWithData(uploadComment, req, res);
    });

    //获取医院评论列表
    app.post('/userGetCommentList', (req, res) => {
        routerWithData(userGetCommentList, req, res);
    });


    //咨询时获取医生列表
    app.post('/chatGetDoctorList', (req, res) => {
        routerWithData(chatGetDoctorList, req, res);
    });

    //获取检查结果
    app.post('/userGetResultList', (req, res) => {
        routerWithoutData(userGetResultList, req, res);
    });
}

module.exports = {
    router
}