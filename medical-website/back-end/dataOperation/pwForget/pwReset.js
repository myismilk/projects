const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

pwReset = (data, resolve, req) => {
    let visitor = req.session.pwReset;
    //console.log(visitor, data);
    if (visitor.email === data.email && visitor.code === data.code
        && visitor.account === data.account && visitor.identity === data.identity) {
        let sql = "update " + data.identity + " set pw=md5(\'" + data.pw + "\') where account=\'" + data.account + "\'";
        conn.query(sql, (err, result) => {
            if (err) {
                errFun(err);
                resolve(JSON.stringify({
                    message: '密码重设失败,请刷新后重试!'
                }));
                return;
            }
            resolve(JSON.stringify({
                message: '密码更新成功!'
            }));
        })
    } else {
        resolve(JSON.stringify({
            message: '账号、邮箱或验证码输入有误,请重新输入!'
        }));
    }
}

module.exports = {
    pwReset
}
