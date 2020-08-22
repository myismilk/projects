const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

pwChange = (data, resolve, req) => {
    let visitor = req.session.visitor;
    let identity = visitor.identity, id = visitor.id;
    let oldPw = data.oldPw, pw = data.pw;
    let sql = "select * from " + identity + " where id=" + id + " and pw=md5(\'" + oldPw + "\')";
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve("网络错误,请刷新后重试!");
            return;
        }
        if (result.length === 0) {
            resolve(JSON.stringify({
                message: '当前密码输入错误，请重新输入!'
            }));
            return;
        } else {
            let sql = "update " + identity + " set pw=md5(\'" + pw + "\') where id=" + id;
            conn.query(sql, (err, result) => {
                if (err) {
                    errFun(err);
                    resolve("密码修改失败,请刷新后重试!");
                    return;
                }
                resolve(JSON.stringify({
                    message: '密码修改成功!'
                }));
                return;
            })
        }
    });

}

module.exports = {
    pwChange
}