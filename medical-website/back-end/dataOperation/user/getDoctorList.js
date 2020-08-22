const conn = require('../databaseConfig').connection;
const weekDay = require('../../globalConfig').weekDay;

errFun = (err) => {
    console.log(err.message);
}

getList = (data, resolve, req) => {
    //console.log(data, weekDay);
    let visitor = req.session.visitor;
    let hosId = visitor.hosId;
    let department = data.department;
    let day = weekDay[data.day];
    let sql = "select name,doctorInfo.doctorId from doctorInfo join doctorArrangement on doctorInfo.hosId = doctorArrangement.hosId and doctorInfo.doctorId = doctorArrangement.doctorId where" +
        " departmentId=\'" + department + "\' and " + day + " =true and doctorInfo.hosId=doctorArrangement.hosId and doctorInfo.hosId=" + hosId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {
                doctorId: result[i].doctorId,
                name: result[i].name
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    getList
}