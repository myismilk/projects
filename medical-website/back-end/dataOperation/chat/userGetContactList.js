const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

userGetContactList = (resolve, req) => {
    let visitor = req.session.visitor;
    let userId = visitor.id;
    let hosId = visitor.hosId;
    let sql = "select name,chat.doctorId from chat join doctorInfo on chat.hosId=doctorInfo.hosId and chat.doctorId = doctorInfo.doctorId " +
        "where userId =" + userId + " and chat.hosId =" + hosId + " group by name,chat.doctorId";
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
                doctorId: temp.doctorId,
                name: temp.name
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    userGetContactList
}