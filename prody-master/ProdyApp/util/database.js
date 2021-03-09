const mysql = require('mysql2');

const pool  = mysql.createPool({
    connectionLimit : 100,
    // host            : '62.0.53.142', // local
    host            : '104.197.244.107', // cloud
    user            : 'webserver1',
    password        : 'sG59Des7g4d',
    database        : 'prody'
   /*
    ,ssl: {
        ca: fs.readFileSync(cerPath + '/server-ca.pem'),
        key: fs.readFileSync(cerPath + '/client-key.pem'),
        cert: fs.readFileSync(cerPath + '/client-cert.pem')
    }
    */
  });

module.exports = pool.promise();