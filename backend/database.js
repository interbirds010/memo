const mysql = require("mysql");

const db = mysql.createConnection({
    host: "192.168.0.4",
    user: "root",
    password: "mysql!%#",
    database: "node_memo"
});

db.connect();

module.exports = db;
