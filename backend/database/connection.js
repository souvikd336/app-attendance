const mysql = require('mysql');
require("dotenv").config();
const dbconnection = mysql.createPool({
  host     : process.env.HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
});

const connectWithDb = () => {
  dbconnection.getConnection(function(err, connection){
    if (err) throw err; // not connected!

  // Use the connection
    connection.query('SELECT * FROM `ADMIN_USERS`', function (error, results, fields) {
    // When done with the connection, release it.
    console.log("Database Connected");
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
  });
}
module.exports = connectWithDb;
/*
mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'souvik@DB',
  database : 'srm'
});
console.log(typeof dbconnection);
console.log(typeof dbconnection.query);

dbconnection.query('SELECT * FROM `STUDENTS`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
*/


//module.exports = dbconnection;
// Attempt to catch disconnects 
/*
dbconnection.getConnection(function(err, connection){
  if (err) throw err;
  //Use the connection
  connection.query('SET SESSION auto_increment_increment=1')
})
*/
/*
dbconnection.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});
*/
/*
dbconnection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});
//module.exports = connectWithDb;

//connection.end();
/*
const mysqlx = require('@mysql/xdevapi');
//https://dev.mysql.com/doc/dev/connector-nodejs/latest/module-Client.html
const config = {
      password: 'souvik@DB',
      user: 'root',
      host: 'localhost',
      port: 33060,
      schema: 'srm'
  };
  */
 /*
const connectWithDb = () => { mysqlx.getSession(config)
      .then(session => {
          console.log("Database connected."); // { user: 'root', host: 'localhost', port: 33060 }
      });
    }
module.exports = connectWithDb;
*/