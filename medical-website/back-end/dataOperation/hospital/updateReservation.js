const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

download = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.id;
    let department = data.department;
    let sql = "select doctorId,workNum,name from doctorInfo where hosId=\'" + hosId + "\' and departmentId =\'" + department + "\'";
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
                workNum: result[i].workNum,
                name: result[i].name
            }
        }
        //console.log(arr);
        resolve(JSON.stringify(arr));
    })
}

update = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.id;
    let doctorId = data.doctorId;
    let sun = data.sun, mon = data.mon, tue = data.tue, wed = data.wed,
        thu = data.thu, fri = data.fri, sat = data.sat;
    let maxDay = data.maxDay;
    let sql = "call updateDoctorArrangement(" + doctorId + "," + hosId + "," + maxDay + "," + sun + "," +
        mon + "," + tue + "," + wed + "," + thu + "," + fri + "," + sat + ")";
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve(JSON.stringify({message: 'failed'}));
            return;
        }
        resolve(JSON.stringify({message: 'succeed'}));
    })
}

module.exports = {
    download,
    update
}