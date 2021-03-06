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
    //?????????????????????
    resourcePath = dir + '/public/';

    //????????????
    app.post('/chooseHos', (req, res) => {
        routerWithoutData(chooseHos, req, res);
    })

    //??????????????????????????????
    app.post('/getHistoryHosList', (req, res) => {
        routerWithoutData(getHistoryHosList, req, res);
    })


    //??????hosId
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

    //???????????????????????????
    app.post('/userGetDoctorList', (req, res) => {
        routerWithData(getList, req, res);
    });

    //??????????????????
    app.post('/makeReservation', (req, res) => {
        routerWithData(make, req, res);
    });


    //??????????????????????????????
    app.post('/userGetDoctorListDetail', (req, res) => {
        routerWithData(getListDetail, req, res);
    });

    //??????????????????
    app.post('/getReservationList', (req, res) => {
        routerWithoutData(getReservation, req, res);
    });

    //????????????
    app.post('/cancelReservation', (req, res) => {
        routerWithData(cancelReservation, req, res);
    });

    //?????????????????????
    app.post('/userGetReservationListDone', (req, res) => {
        routerWithoutData(getReservationListDone, req, res);
    });


    //????????????
    app.post('/uploadComment', (req, res) => {
        routerWithData(uploadComment, req, res);
    });

    //????????????????????????
    app.post('/userGetCommentList', (req, res) => {
        routerWithData(userGetCommentList, req, res);
    });


    //???????????????????????????
    app.post('/chatGetDoctorList', (req, res) => {
        routerWithData(chatGetDoctorList, req, res);
    });

    //??????????????????
    app.post('/userGetResultList', (req, res) => {
        routerWithoutData(userGetResultList, req, res);
    });
}

module.exports = {
    router
}