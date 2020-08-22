const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

make = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.hosId;
    let userId = visitor.id;
    let doctorId = data.doctorId;
    let time = data.y + "-" + data.m + "-" + data.d;
    conn.query("call makeReservation(@arg," + hosId + "," + userId + "," + doctorId + ",\'" + time + "\')", function (err, rows, fields) {
        if (err) {
            errFun(err);
            resolve("预约失败,请刷新后重试!");
            return;
        } else {
            let returnArg = rows[0][0].result;
            if (returnArg === -1) {
                resolve('该医生当日的预约已满，请预约别的医生!');
            } else if (returnArg === 1) {
                resolve('预约成功!');
            } else {
                resolve('请勿重复预约!');
            }
            return;
        }
    });
}

module.exports = {
    make
}