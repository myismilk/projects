const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

cancelReservation = (data, resolve, req) => {
    let reservationId = data.id;
    let sql = "update reservation set isCanceled = true where id=" + reservationId;
    conn.query(sql, (err, result) => {
        if (err) {
            errFun(err);
            resolve(JSON.stringify({ message: "failed" }));
            return;
        }
        resolve(JSON.stringify({ message: "succeed" }));
    })
}

module.exports = {
    cancelReservation
}