const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

ipOperation = (ip, resolve) => {
    let sql = 'select count from ipRecord where ipAddr=\'' + ip + '\'';
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            return;
        }
        if (result.length === 0) { //初次访问
            let sql = 'insert into ipRecord(ipAddr, count) values (\'' + ip + '\',' + 1 + ')';
            conn.query(sql, (err) => {
                if (err) {
                    errFun(err);
                    return;
                }
            });
            resolve(1);
        } else { //访问次数加1
            let sql = 'update ipRecord set count=' + (result[0].count + 1) + ' where ipAddr=\'' + ip + '\'';
            conn.query(sql, (err) => {
                if (err) {
                    errFun(err);
                    return;
                }
            });
            resolve(result[0].count + 1);
        }
        
    });
}

module.exports = {
    ipOperation
}
