const mysql = require('mysql2');

const pool  = mysql.createPool({
    connectionLimit : 100,
    // host            : '62.0.53.142', // local
    host            : 'sql5.freemysqlhosting.net', // cloud
    user            : 'sql5396493',
    password        : 'TZRVXNLpNq',
    database        : 'sql5396493'
   /*
    ,ssl: {
        ca: fs.readFileSync(cerPath + '/server-ca.pem'),
        key: fs.readFileSync(cerPath + '/client-key.pem'),
        cert: fs.readFileSync(cerPath + '/client-cert.pem')
    }
    */
  });

module.exports = pool.promise();