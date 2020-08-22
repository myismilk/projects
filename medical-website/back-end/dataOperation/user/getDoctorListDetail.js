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
    let sql = "select name,doctorId,picPath,des,contact from doctorInfo where" +
        " departmentId=\'" + department + "\' and hosId=" + hosId;
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
                name: result[i].name,
                des: result[i].des,
                url: result[i].picPath,
                contact: result[i].contact
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    getList
}