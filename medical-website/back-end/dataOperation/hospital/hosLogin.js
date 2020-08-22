const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

hosLogin = (loginData, resolve, req) => {
    let account = loginData.account, pw = loginData.pw;
    let sql = "select * from hospital where account=\'" + account + "\' and pw=md5(\'" + pw + "\')";
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
            let sql = "select id from hospital where account=\'" + account + "\'";
            conn.query(sql, (err, result) => {
                if (err) {
                    errFun(err);
                    resolve("登录失败,请刷新后重试!");
                    return;
                }
                let visitor = {
                    identity: 'hospital',
                    account: account,
                    id: result[0].id
                }
                req.session.visitor = visitor;
                resolve("succeed");
                return;
            })
        }
    });
}

module.exports = {
    hosLogin
}