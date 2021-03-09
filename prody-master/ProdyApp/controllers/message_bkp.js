const db = require('../util/database');

exports.postMessage = (req, res) => {
    const message = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        message_issue: req.body.message_issue,
        message_content: req.body.message_content,
        message_date: req.body.message_date
    };

    console.log('--- message ---');
    console.log(message);

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const insertMessage = (messageData) => {
        return db.query(`INSERT INTO prody.MESSAGES (prod_barcode, user_id, created_date, message_issue, message) 
                    values (?,?,?,?,?)`,
                    [messageData.prod_barcode, messageData.user_id, messageData.message_date, messageData.message_issue, messageData.message_content]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };

    insertMessage(message)
        .then(() => {return getProductPoints(message.prod_barcode);})
        .then(([rows, fieldData]) => {
            console.log('points:' + rows[0].points_granted);
            return updatePoints(message.user_id,rows[0].points_granted * 2);})
        .then(() => {return getProductPoints(message.prod_barcode);})
        .then(([rows, fieldData]) => {
            res.status(200).send({points_granted: rows[0].points_granted * 2});})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};