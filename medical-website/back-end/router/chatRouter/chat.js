const express = require('express');
const expressWs = require('express-ws');
const router = express.Router();
const msgToDoctor = require('../../dataOperation/chat/msgOperate').msgToDoctor;
const msgToUser = require('../../dataOperation/chat/msgOperate').msgToUser;

const testUserSession = require('../../globalConfig').testUserSession;
const testDoctorSession = require('../../globalConfig').testDoctorSession;

expressWs(router);
let userClients = [], doctorClients = [];

router.ws('/msgToDoctor', function (ws, req) {
    //session test
    if (!req.session.visitor) {
        req.session.visitor = testUserSession;
    }
    let temp = {
        ws: ws,
        doctorId: undefined,
        userId: undefined
    }
    userClients.push(temp);
    ws.on('message', function (message) {
        let data = JSON.parse(message);
        let promise = new Promise((resolve, reject) => {
            msgToDoctor(data, resolve, req, reject);
        });
        promise.then(messageToClient => {
            ws.send(messageToClient);
            temp.doctorId = data.doctorId;
            temp.userId = req.session.visitor.id;
            for (let i = 0; i < doctorClients.length; i++) {
                if (doctorClients[i].userId === temp.userId && doctorClients[i].doctorId === temp.doctorId) {
                    doctorClients[i].ws.send(JSON.stringify({
                        msgType: 'onlineChat',
                        userId: temp.userId,
                        msg: data.msg,
                        msgFrom: 'user'
                    }))
                    break;
                }
            }
        }, (val) => {

        });
    })

    ws.onclose = () => {
        userClients = userClients.filter(function (wsTemp) {
            return wsTemp !== ws;
        });
    }
});

router.ws('/msgToUser', function (ws, req) {
    if (!req.session.visitor) {
        req.session.visitor = testDoctorSession;
    }

    let temp = {
        ws: ws,
        doctorId: undefined,
        userId: undefined
    }
    doctorClients.push(temp);
    ws.on('message', function (message) {
        let data = JSON.parse(message);
        let promise = new Promise((resolve, reject) => {
            msgToUser(data, resolve, req, reject);
        });
        promise.then(messageToClient => {
            ws.send(messageToClient);
            temp.doctorId = req.session.visitor.id;
            temp.userId = data.userId;
            for (let i = 0; i < userClients.length; i++) {
                if (userClients[i].userId === temp.userId && userClients[i].doctorId === temp.doctorId) {
                    userClients[i].ws.send(JSON.stringify({
                        msgType: 'onlineChat',
                        doctorId: temp.doctorId,
                        msg: data.msg,
                        msgFrom: 'doctor'
                    }))
                    break;
                }
            }
        }, (val) => {

        });
    })

    ws.onclose = () => {
        doctorClients = doctorClients.filter(function (wsTemp) {
            return wsTemp !== ws;
        });
    }
});

module.exports = {
    router
}
