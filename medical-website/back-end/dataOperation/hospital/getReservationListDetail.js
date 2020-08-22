const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getList = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.id;
    let time = data.time, departmentId = data.department;
    let sql = "call hosGetReservationListDetail(\'" + departmentId + "\'," + hosId + ",\'" + time + "\')";
    conn.query(sql, (err, rows, fields) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        let row = rows[0];
        let arr = [];
        for (let i = 0; i < row.length; i++) {
            arr[i] = {
                name: row[i].name,
                workNum: row[i].workNum,
                idNum: row[i].idNum,
                time: time
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    getList
}