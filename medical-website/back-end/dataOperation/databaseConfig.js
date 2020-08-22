const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
});

//建立数据库连接
connection.connect();

module.exports = {
    connection
}