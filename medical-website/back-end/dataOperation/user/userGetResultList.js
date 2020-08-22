const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

userGetResultList = (resolve, req) => {
    let visitor = req.session.visitor;
    let hosId = visitor.hosId;
    let userId = visitor.id;
    let sql = "select resultPath,title,des from result " +
        "join userInfo on result.idNum = userInfo.idNum " +
        "join user on user.id = userInfo.userId " +
        "where userId =" + userId + " and hosId = " + hosId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("");
            return;
        }
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {
                title: result[i].title,
                introduce: result[i].des,
                picPath: result[i].resultPath,
            }
        }
        resolve(JSON.stringify(arr));
    })
}

module.exports = {
    userGetResultList
}