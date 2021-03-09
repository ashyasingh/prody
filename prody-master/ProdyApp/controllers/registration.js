const db = require('../util/database');
const dateFormat = require('dateformat');

exports.postRegistration = (req, res, next) => {
    if(!req.body.email) {return res.status(400).send('prody error: email is missing !');} // 400 bad request
    const user = {
        email: req.body.email,
        // password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        created_date: req.body.date,
        firebase_UID: req.body.firebase_UID,
        login_method: req.body.login_method,
        cellphone: req.body.cellphone,
        country_id: req.body.country_id,
        region: req.body.region,
        city: req.body.city,
        language: req.body.language,
        user_type: req.body.user_type
    };
    
    // check if email exists
    const checkEmail = (email) => {
        return db.query(`select email from prody.USERS where email = ?`, [email]);
    };

    // create user
    const insertData = (userData) => {
        console.log(userData);
        return db.query(`INSERT INTO prody.USERS (email, first_name, last_name, birthdate, gender, created_date,
        firebase_UID, login_method, cellphone, country_id, region, city, language, user_type) 
        values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [userData.email, userData.first_name, userData.last_name, userData.birthdate, userData.gender, userData.created_date,
            userData.firebase_UID, userData.login_method, userData.cellphone, userData.country_id, userData.region, userData.city, userData.language, userData.user_type]);
    };

    // return user id
    const getUserID = (email) => {
        return db.query(`select users_id as id, titles from prody.vw_api_user_info where users_email = ?`, [email]);
    };

    checkEmail(user.email)
    .then(([rows, fieldData]) => {
        if(rows.length != 0)
        {return res.status(400).send(`prody error: email already exist.`);} // 400 bad request
        else
        {return insertData(user)
            .then(([rows, fieldData]) => {
                return getUserID(user.email)
            })
            .then(([rows, fieldData]) => {
                return res.send(rows[0]);
            })
            .catch(err => res.status(404).send(`prody error: ${err}`));
        }
    })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getUserInfoByUserID = (req, res, next) => {
    const getData = (id) => {
       return db.query(`select * from vw_api_user_info where users_id = ?`, [id]);
    };
   
    getData(req.params.id)
    .then(([rows, fieldData]) => {
        if(rows.length == 0) {
                return res.status(400).send(`prody error: no data found for user id ${req.params.id}.`); // 400 bad request
            } else {
                let formattedBirthdate = dateFormat(rows[0].birthdate, "yyyy-mm-dd");
                rows[0].users_birthdate = formattedBirthdate;
                let formattedCreated_date = dateFormat(rows[0].created_date, "yyyy-mm-dd HH:MM:ss");
                rows[0].users_created_date = formattedCreated_date;
                res.send(rows[0]);
            }
        }
    )
    .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getUserInfoByFirebaseUID = (req, res, next) => {
    const getData = (id) => {
       return db.query(`select * from vw_api_user_info where users_firebase_UID = ?`, [id]);
    };
   
    getData(req.params.id)
    .then(([rows, fieldData]) => {
        if(rows.length == 0) {
            res.status(400).send(`prody error: no data found for firebase UID ${req.params.id}.`); // 400 bad request
            } else {
                let formattedBirthdate = dateFormat(rows[0].birthdate, "yyyy-mm-dd");
                rows[0].users_birthdate = formattedBirthdate;
                let formattedCreated_date = dateFormat(rows[0].created_date, "yyyy-mm-dd HH:MM:ss");
                rows[0].users_created_date = formattedCreated_date;
                res.send(rows[0]);
            
            }
        }
    )
    .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.postUpdateUserInfo = (req, res, next) => { // first name, last name, bithdate, gender
    if(!req.params.id) {return res.status(400).send('prody error: user id is missing !');} // 400 bad request
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        gender: req.body.gender
    };

    const postData = (id) => {
        return db.query(`UPDATE prody.USERS SET first_name = ?, last_name = ?, birthdate = ?, gender = ? WHERE id = ?`,
        [user.first_name, user.last_name, user.birthdate, user.gender, id]);
    };

    postData(req.params.id)
    .then(([rows, fieldData]) => {
       res.status(200).send('user info updated.');
    })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};


