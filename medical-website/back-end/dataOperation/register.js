const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

register = (registerData, resolve) => {
    let identity = registerData.identity, account = registerData.account, pw = registerData.pw;
    if (identity === 'user') {
        let idNum = registerData.idNum, nickName = registerData.nickName;
        let sql = "select * from user,userInfo where account=\'" + account + "\' or nickName=\'" + nickName + "\' or idNum=\'" + idNum + "\'";
        conn.query(sql, (err, result) => {
            if (err) {
                errFun(err);
                resolve("注册失败,请重新注册!");
                return;
            }
            if (result.length === 0) {
                conn.query("call userRegister(\'" + account + "\',\'" + pw + "\',\'" + idNum + "\',\'" + nickName + "\')", function (err, rows, fields) {
                    if (err) {
                        resolve("注册失败,请重新注册!");
                    } else {
                        resolve('注册成功!');
                    }
                });

            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].account === account) {
                        resolve('此账号已被注册,请重新填写!');
                        return;
                    }
                    if (result[i].idNum === idNum) {
                        resolve('此身份证号已被注册,请重新填写!');
                        return;
                    }
                    if (result[i].nickName === nickName) {
                        resolve('昵称已被占用,请重新填写!');
                        return;
                    }
                }
            }
        })
    } else if (identity === 'doctor') {
        let workName = registerData.workName, hosNum = registerData.hosNum, workNum = registerData.workNum;
        let sql = "select * from doctor where account=\'" + account + "\'";
        conn.query(sql, (err, result) => {
            if (err) {
                errFun(err);
                resolve("注册失败,请重新注册!");
                return;
            }
            if (result.length === 0) {
                conn.query("call doctorRegister(@arg,\'" + account + "\',\'" + pw + "\',\'" + workNum + "\',\'" + hosNum + "\',\'" + workName + "\')", function (err, rows, fields) {
                    if (err) {
                        errFun(err);
                        resolve("注册失败,请重新注册!");
                        return;
                    } else {
                        let returnArg = rows[0][0].str;
                        if (returnArg === -1) {
                            resolve('医院编号有误,请重新填写!');
                        } else if (returnArg === -2) {
                            resolve('同一员工编号只能注册一次,请确认后填写!');
                        } else {
                            resolve('注册申请已提交,审核通过后注册成功!');
                        }
                        return;
                    }
                });
            } else {
                resolve("此账号已被注册,请重新填写!");
                return;
            }
        })
    }

}

module.exports = {
    register
}