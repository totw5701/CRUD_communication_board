var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89940775',
    database: 'communication_board_CRUD'
  });
  db.connect();

  module.exports = db;