console.log("hello world")
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3306;
const table = 'COMPANY';

const pool = mysql.createPool({
    host: "sql5.freemysqlhosting.net",
    user: "sql5396493",
    password: "TZRVXNLpNq",
    database: "sql5396493"
});
//console.log(pool);
app.listen(port, () => {
    console.log(`App server now listening to port ${port}`);
});
pool.query(`select Name from ${table}`, (err, rows) => {
    if (err) {
        console.log("error");
    } else {
        console.log(rows);
    }
})

return;

// app.get('/api/users', (req, res) => {
//     pool.query(`select * from ${table}`, (err, rows) => {
//         if (err) {
//             res.send(err);
//         } else {
//             console.log(rows);
//             res.send(rows);
//         }
//     });
// });