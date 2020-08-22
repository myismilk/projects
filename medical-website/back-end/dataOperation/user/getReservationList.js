const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getList = (resolve, req) => {
    //console.log(data, weekDay);
    let visitor = req.session.visitor;
    let hosId = visitor.hosId;
    let userId = visitor.id;
    let sql = "select id,time,name,departmentId from reservation join doctorInfo on reservation.doctorId = doctorInfo.doctorId and " +
        "reservation.hosId = doctorInfo.hosId where isCanceled = false and isDone=false and userId =" + userId + " and doctorInfo.hosId =" + hosId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        //console.log(result);
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {
                reservationId: result[i].id,
                doctorName: result[i].name,
                time: result[i].time,
                department: result[i].departmentId
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    getList
}