var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'homework',
    password: 'Sanjose#18',
    database: 'mysql-homework'
})


module.exports = pool;