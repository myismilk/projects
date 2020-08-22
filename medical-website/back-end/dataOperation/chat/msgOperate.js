const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

msgToDoctor = (data, resolve, req, reject) => {
    let visitor = req.session.visitor;
    let userId = visitor.id;
    let hosId = visitor.hosId;
    let doctorId = data.doctorId, name = data.name;
    let msg = data.msg;

    let sql = "call userMsgToServer(" + userId + ", " + doctorId + ", " + hosId + ", \'" + msg + "\')";
    conn.query(sql, (err, rows, fields) => {
        if (err) {
            errFun(err);
            reject('failed');
            return;
        }
        resolve(JSON.stringify({
            msgType: 'msgToServer',
            status: 'succeed',
            doctorId: doctorId,
            msg: msg
        }));
    })
}

msgToUser = (data, resolve, req, reject) => {
    let visitor = req.session.visitor;
    let doctorId = visitor.id;
    let hosId = visitor.hosId;
    let userId = data.userId;
    let msg = data.msg;

    let sql = "call doctorMsgToServer(" + userId + ", " + doctorId + ", " + hosId + ", \'" + msg + "\')";
    conn.query(sql, (err, rows, fields) => {
        if (err) {
            errFun(err);
            reject('failed');
            return;
        }
        resolve(JSON.stringify({
            msgType: 'msgToServer',
            status: 'succeed',
            userId: userId,
            msg: msg
        }));
    })
}

module.exports = {
    msgToDoctor,
    msgToUser
}