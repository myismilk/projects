const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

userGetCommentList = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = data.hosId;
    let sql = "select nickName,comment.time,name,content from comment " +
        "join userInfo on userInfo.userId = comment.userId " +
        "join doctorInfo on doctorInfo.doctorId = comment.doctorId and doctorInfo.hosId = comment.hosId " +
        "where comment.hosId =" + hosId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {
                userName: result[i].nickName,
                doctorName: result[i].name,
                time: result[i].time,
                content: result[i].content
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    userGetCommentList
}