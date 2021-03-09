const path = require('path');
const dateFormat = require('dateformat');
const db = require('../util/database');

exports.getLandingPage = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'landingpage','index_blank.html'));
};

exports.postLandingPage = (req, res) => {
    console.log(`landing page submit: email: ${req.body.email} message: ${req.body.message}`);
    
    
    const insertMessage = ( email, message ) => {
        let created_date = dateFormat(new Date, "yyyy-mm-dd HH:MM:ss");
        return db.query(`INSERT INTO prody.landingpage (email, message, created_date) VALUES (?, ?, ?)`,
        [email, message, created_date]);
    }

    insertMessage( req.body.email, req.body.message )
    .then( () => {
        res.sendFile(path.join(__dirname, '../', 'landingpage','thankyou.html'));
    })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};