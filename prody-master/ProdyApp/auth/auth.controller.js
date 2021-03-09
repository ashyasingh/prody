const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("./auth.config");
const db = require("../util/database");
const dateFormat = require('dateformat');

exports.signin = (req, res) => {
    const username = req.body.username;
    // console.log(username);
    const now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    const getUser = (username) => {
        return db.query(`select * from CONSOLE_USERS WHERE username = ?`,[username])
    };

    const insertLog = (username, date) => {
        return db.query(`insert into console_log (type, message, created_date) values ('login', ?, ?)`, [username, date])
    };

    getUser(username)
        .then(([rows,fieldData]) => {
            console.log(rows[0]);
            if (!rows[0].username) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                rows[0].password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ username: rows[0].username }, config.secret, {
                expiresIn: 86400 // 24 hours
            });


            res.status(200).send({
                username: rows[0].username,
                accessToken: token,
                expireAt: Date.now()+86400
            });
        })
        .then(() => {return insertLog(username, now);})
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};