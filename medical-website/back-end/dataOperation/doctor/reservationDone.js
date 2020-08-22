const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

reservationDone = (data, resolve, req) => {
    let reservationId = data.reservationId;
    let sql = "update reservation set isDone = true where id =" + reservationId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve(JSON.stringify({
                message: 'failed'
            }));
            return;
        }
        resolve(JSON.stringify({
            message: 'succeed'
        }));
    })
}

module.exports = {
    reservationDone
}
