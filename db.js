const mysql = require('mysql')
const dbData = require('./db.json')

const connect = () => {
    return mysql.createConnection(dbData);
}

let sqlConn = connect()
module.exports = sqlConn;