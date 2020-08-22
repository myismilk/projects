const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getMessages = (page, resolve) => {
    let sql = 'select * from messageboard where isDeleted=0 and page=' + page;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            return;
        }
        resolve(result);
    })
}

module.exports = {
    getMessages
}