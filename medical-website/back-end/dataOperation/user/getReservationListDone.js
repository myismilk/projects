const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getList = (resolve, req) => {
    //console.log(data, weekDay);
    let visitor = req.session.visitor;
    let hosId = visitor.hosId;
    let userId = visitor.id;
    let sql = "select time,departmentId,name,isDone,reservation.doctorId,isCommented " +
        "from reservation join doctorInfo on reservation.doctorId = doctorInfo.doctorId and " +
        "reservation.hosId = doctorInfo.hosId " +
        "where isCanceled = false and reservation.userId =" + userId + " and reservation.hosId =" + hosId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {
                isCommented: result[i].isCommented,
                isDone: result[i].isDone,
                doctorId: result[i].doctorId,
                doctorName: result[i].name,
                time: result[i].time,
                department: result[i].departmentId,
                content: ''
            }
        }
        let sql02 = "select content,id,doctorId,time from comment where userId=" + userId + " and hosId=" + hosId;
        conn.query(sql02, (err, result02) => {
            if (err) {
                errFun(err);
                resolve("");
                return;
            }
            for (let i = 0; i < result02.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].doctorId === result02[i].doctorId && arr[j].time === result02[i].time) {
                        arr[j].content = result02[i].content;
                        break;
                    }
                }
            }
            resolve(JSON.stringify(arr));
        })
    })
}

module.exports = {
    getList
}