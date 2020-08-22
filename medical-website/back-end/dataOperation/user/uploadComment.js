const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

uploadComment = (data, resolve, req) => {
    //console.log(data, weekDay);
    let visitor = req.session.visitor;
    let hosId = visitor.hosId;
    let userId = visitor.id;
    let doctorId = data.doctorId, time = data.time, content = data.content;
    let sql = "call uploadComment(" +
        userId + "," + doctorId + "," + hosId + ",\'" + time + "\',\'" + content + "\')";
    conn.query(sql, (err, rows, fields) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        resolve(JSON.stringify({
            message: 'succeed'
        }));
    })
}

module.exports = {
    uploadComment
}