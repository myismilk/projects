const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getList = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let doctorId = visitor.id;
    let time = data.time;
    let sql = "call doctorGetReservationList(" + doctorId + ",\'" + time + "\')";
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
                id: row[i].id,
                name: row[i].nickName,
                idNum: row[i].idNum,
                isDone: row[i].isDone
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    getList
}