const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

doctorGetAllMsg = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let doctorId = visitor.id;
    let hosId = visitor.hosId;
    let userId = data.userId;
    let sql = "select id,content,msgFrom from chat join chatContent on id = chatId where userId =" + userId + " and doctorId =" + doctorId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("failed");
            return;
        }
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            let temp = result[i];
            arr[i] = {
                msg: temp.content,
                msgFrom: temp.msgFrom
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    doctorGetAllMsg
}