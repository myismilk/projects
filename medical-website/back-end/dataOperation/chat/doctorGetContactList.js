const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

doctorGetContactList = (resolve, req) => {
    let visitor = req.session.visitor;
    let doctorId = visitor.id;
    let hosId = visitor.hosId;
    let sql = "select nickName,chat.userId from chat join userInfo on chat.userId = userInfo.userId " +
        "where doctorId = " + doctorId + " and chat.hosId =" + hosId + " group by nickName,chat.userId";
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
                userId: temp.userId,
                name: temp.nickName
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    doctorGetContactList
}