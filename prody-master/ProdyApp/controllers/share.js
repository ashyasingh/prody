const db = require('../util/database');

exports.postShare = (req, res) => {
    if(!req.body.share_application || !req.body.share_content) {
        return res.status(400).send('Missing Data !'); // 400 bad request
    } 
    const share = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        shared_app: req.body.share_application,
        is_fixed_message: req.body.share_fix_message,
        content: req.body.share_content,
        created_date: req.body.share_date,
        points_granted: null
    };

    console.log('--- share ---');
    console.log(share);

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };


    const insertShare = (shareData) => {
        return db.query(`INSERT INTO prody.SHARE (prod_barcode, user_id, created_date, shared_app, is_fixed_message, content, points_granted) VALUES (?,?,?,?,?,?,?)`,
                [shareData.prod_barcode, shareData.user_id, shareData.created_date, shareData.shared_app, shareData.is_fixed_message, shareData.content, shareData.points_granted]);
    };

    getProductPoints(share.prod_barcode)
        .then( ([rows, fieldData]) => {
            share.points_granted = rows[0].points_granted * 3;
            return insertShare(share);})
        .then( () => {return updatePoints(share.user_id,share.points_granted);})
        .then( () => {res.status(200).send({points_granted: share.points_granted});})
        .catch(err => res.status(404).send(`prody error: ${err}`));


    /*insertShare(share)
        .then(() => {return getProductPoints(share.prod_barcode);})
        .then(([rows, fieldData]) => {
            return updatePoints(share.user_id,rows[0].points_granted * 3);})
        .then(() => {return getProductPoints(share.prod_barcode);})
        .then(([rows, fieldData]) => {
            res.status(200).send(rows[0]);})
        .catch(err => res.status(404).send(`prody error: ${err}`));*/
};