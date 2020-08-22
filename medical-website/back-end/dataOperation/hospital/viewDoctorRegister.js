const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

view = (resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.id;
    let sql = "select doctorId,workNum,name from doctorInfo where hosId=\'" + hosId + "\' and isViewed = false";
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

passOrNot = (viewData, resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.id;
    let passOrNot = viewData.passOrNot;
    let department = viewData.department;
    let workNum = viewData.workNum;
    let doctorId = viewData.doctorId;
    let sql = '';
    if (passOrNot) {
        sql = "update  doctorInfo,doctor set departmentId=\'" + department + "\',doctor.isViewed = true,doctor.isValid=" + passOrNot + ", doctorInfo.isViewed = true,doctorInfo.isValid=" + passOrNot + " where id = doctorId and id =" + doctorId;
    } else {
        sql = "update  doctorInfo,doctor set doctor.isViewed = true,doctor.isValid=" + passOrNot + ", doctorInfo.isViewed = true,doctorInfo.isValid=" + passOrNot + " where id = doctorId and id =" + doctorId;
    }

    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve(JSON.stringify({ message: 'failed' }));
            return;
        }
        resolve(JSON.stringify({ message: 'succeed' }));
    })
}

module.exports = {
    view,
    passOrNot
}