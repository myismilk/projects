const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

userVisitedHos = (userId, hosId) => {
    //console.log(userId, hosId);
    conn.query("call userVisitedHos(" + userId + "," + hosId + ")", function (err, rows, fields) {
        if (err) {
            errFun(err);
            return;
        }
    });
}

module.exports = {
    userVisitedHos
}