const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

toString = (str) => {
    if (str < 10) {
        return "0" + String(str);
    } else {
        return String(str);
    }
}

uploadMes = (resolve, reject, ip, content) => {
    let date = new Date();
    let year, month, day, hour, minu, second;
    year = String(date.getFullYear()).substr(2);
    month = toString(date.getMonth() + 1);
    day = toString(date.getDate());
    hour = toString(date.getHours());
    minu = toString(date.getMinutes());
    second = toString(date.getSeconds());
    let time = year + month + day + hour + minu + second;
    let timeDay = year + month + day;
    let sql1 = "select * from messageboard where day=" + timeDay;
    conn.query(sql1, (err, result) => {
        if (err) {
            errFun(err);
            return;
        }
        if (result.length >= 100) {//每个ip当日留言不超过100条
            reject();
            return;
        } else {
            let sql2 = "select floorNumber,page from messageboard where isDeleted=0 order by id DESC limit 1";
            conn.query(sql2, (err, result) => {
                if (err) {
                    errFun(err);
                    return;
                }
                let floorNumber = result[0].floorNumber;
                let page = result[0].page;
                //设置每页留言条数为9条
                if (floorNumber % 9 === 0) {
                    page += 1;
                }
                let sql3 = "insert into messageboard(name, content,isDeleted, floorNumber, page, ipAddr, day) values(\'"
                    + time + "\',\'" + content + "\'," + 0 + "," + (floorNumber + 1) + "," + page + ",\'" + ip + "\',\'" + timeDay + "\')";
                conn.query(sql3, (err, result) => {
                    if (err) {
                        errFun(err);
                        return;
                    }
                    resolve();
                })
            })
        }
    })
}

module.exports = {
    uploadMes
}