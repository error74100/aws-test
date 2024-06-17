const mysql = require('mysql');

const dbConnect = mysql.createPool({
  // DB 연동시 위한 코드
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'board',
});

module.exports = dbConnect;
