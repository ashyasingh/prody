const db = require('../util/database');

exports.postOpinion = (req, res) => {
    const opinion = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        traffic_light: req.body.opinion_tl,
        grade: req.body.opinion_grade,
        will_buy: req.body.opinion_willbuy,
        defective: req.body.opinion_defective,
        type: req.body.opinion_type,
        created_date: req.body.opinion_date
    };


    // convert string null to real null
    if(opinion.will_buy === 'null') {opinion.will_buy = null;}
    if(opinion.defective === 'null') {opinion.defective = null;}
    if(opinion.type === 'null') {opinion.type = null;}

    console.log('--- opinion ---');
    console.log(opinion);

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const insertOpinion = (opinionData) => {
        return db.query(`INSERT INTO prody.OPINIONS (prod_barcode, user_id, traffic_light, grade, will_buy, defective, type, created_date) 
                    values (?,?,?,?,?,?,?,?)`,
                    [opinionData.prod_barcode, opinionData.user_id, opinionData.traffic_light, opinionData.grade, opinionData.will_buy,
                        opinionData.defective, opinionData.type, opinionData.created_date]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };

    insertOpinion(opinion)
        .then(() => {return getProductPoints(opinion.prod_barcode);})
        .then(([rows, fieldData]) => {
            console.log('points:' + rows[0].points_granted);
            return updatePoints(opinion.user_id,rows[0].points_granted);})
        .then(() => {return getProductPoints(opinion.prod_barcode);})
        .then(([rows, fieldData]) => {
            res.status(200).send(rows[0]);})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};