const conn = require('./databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getMaxPage = (resolve) => {
    let sql = "select page from messageboard order by id DESC limit 1";
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            return;
        }
        resolve(result[0].page);
    })
}

module.exports = {
    getMaxPage
}