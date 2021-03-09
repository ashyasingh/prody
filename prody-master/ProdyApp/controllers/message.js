const db = require('../util/database');
const logger = require('../services/logger');
const email = require('../email/message_email');

exports.postMessage = (req, res) => {
    const message = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        message_issue: req.body.message_issue,
        message_content: req.body.message_content,
        message_date: req.body.message_date,
        points_granted: null,
        preferred_contact_method: req.body.preferred_contact_method
    };

    console.log('--- message ---');
    console.log(message);

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const insertMessage = (messageData) => {
        console.log(`insertMessage -> points_granted: ${messageData.points_granted}`)
        return db.query(`INSERT INTO prody.MESSAGES (prod_barcode, user_id, created_date, message_issue, message, points_granted, preferred_contact_method) 
                    values (?,?,?,?,?,?,?)`,
                    [messageData.prod_barcode, messageData.user_id, messageData.message_date, messageData.message_issue, messageData.message_content, messageData.points_granted, messageData.preferred_contact_method]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };

    const getEmailData = (userid, barcodeid) => {
        console.log(`getting email data for userid:${userid} barcodeid:${barcodeid}`);
        return db.query(`call sp_api_GetMessageEmailData(?, ?)`, [userid, barcodeid]);
    };

    getProductPoints(message.prod_barcode)
        .then( ([rows, fieldData]) => {
            message.points_granted = rows[0].points_granted * 2;
            return insertMessage(message);})
        .then(() => {return updatePoints(message.user_id,message.points_granted);})
        .then(() => {return getEmailData(message.user_id, message.prod_barcode);})
        .then(([rows, fieldData]) => {
            const emailData = {
                prod_barcode: message.prod_barcode,
                prod_desc: rows[0][0].prod_desc,
                message_issue: message.message_issue,
                message_content: message.message_content,
                first_name: rows[0][0].first_name,
                phone: rows[0][0].phone,
                preferred_contact_method: message.preferred_contact_method,
                email_service: rows[0][0].email_service
            };
            console.log(emailData);
            logger.writeLog('---  message email data --- ' + JSON.stringify(emailData, null, 2));
            setTimeout(() => {
                email.sendEmail(emailData);
            }, 1000);
            return res.status(200).send({points_granted: message.points_granted});
        })
        .catch(err => res.status(404).send(`prody error: ${err}`));
};