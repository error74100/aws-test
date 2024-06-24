const mysql = require('mysql');
require('dotenv').config();

const dbConnect = mysql.createPool({
  // DB 연동시 위한 코드
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

module.exports = dbConnect;
