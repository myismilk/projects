const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

login = (loginData, resolve, req) => {
    let identity = loginData.identity, account = loginData.account, pw = loginData.pw;
    if (identity === 'user') {
        let sql = "select * from user where account=\'" + account + "\' and pw=md5(\'" + pw + "\')";
        conn.query(sql, (err, result) => {
            if (err) {
                errFun(err);
                resolve("登录失败,请刷新后重试!");
                return;
            }
            if (result.length === 0) {
                resolve("账号或密码错误,请重新输入!");
                return;
            } else {
                let sql = "select id from user where account=\'" + account + "\'";
                conn.query(sql, (err, result) => {
                    if (err) {
                        errFun(err);
                        resolve("登录失败,请刷新后重试!");
                        return;
                    }
                    let visitor = {
                        identity: 'user',
                        account: account,
                        id: result[0].id
                    }
                    req.session.visitor = visitor;
                    resolve("succeed");
                    return;
                })
            }
        });
    } else if (identity === 'doctor') {
        let sql = "select id,hosId from doctor,doctorInfo where id = doctorId and doctor.isValid = true and account=\'" + account + "\' and pw=md5(\'" + pw + "\')";
        conn.query(sql, (err, result) => {
            if (err) {
                errFun(err);
                resolve("登录失败,请刷新后重试!");
                return;
            }
            if (result.length === 0) {
                resolve("账号或密码错误,请重新输入!");
                return;
            } else {
                let visitor = {
                    identity: 'doctor',
                    account: account,
                    id: result[0].id,
                    hosId: result[0].hosId
                }
                req.session.visitor = visitor;
                resolve("succeed");
                return;
            }
        })
    }

}

module.exports = {
    login
}