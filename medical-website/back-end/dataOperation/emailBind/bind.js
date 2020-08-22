const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

emailBind = (data, resolve, req) => {
    let sessionData = req.session.emailBind;
    let visitor = req.session.visitor;
    let id = visitor.id, identity = visitor.identity;
    //console.log(sessionData, visitor, data);
    if (sessionData.email === data.email && sessionData.code === data.code) {
        let sql = "update " + identity + " set email=\'"+data.email+"\' where id =" + id;
        conn.query(sql, (err, result) => {
            if (err) {
                errFun(err);
                resolve(JSON.stringify({
                    message: '账号绑定邮箱失败,请刷新后重试!'
                }));
                return;
            }
            resolve(JSON.stringify({
                message: '账号绑定邮箱成功!'
            }));
        })
    } else {
        resolve(JSON.stringify({
            message: '邮箱和验证码输入有误,请重新输入!'
        }));
    }
}

module.exports = {
    emailBind
}
