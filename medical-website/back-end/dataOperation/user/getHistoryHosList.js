const conn = require('../databaseConfig').connection;

errFun = (err) => {
    console.log(err.message);
}

getHistoryHosList = (resolve, req) => {
    let visitor = req.session.visitor;
    let userId = visitor.id;
    let sql = "select hosInfo.hosId,name,photoPath from hosInfo join visitedHos on visitedHos.hosId = hosInfo.hosId where userId =" + userId;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500);
            res.end();
            return;
        }
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {
                hosId: result[i].hosId,
                name: result[i].name,
                photoPath: result[i].photoPath,
            }
        }
        resolve(JSON.stringify(arr));
    })

}

module.exports = {
    getHistoryHosList
}