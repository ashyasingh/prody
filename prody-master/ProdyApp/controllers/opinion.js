const db = require('../util/database');

exports.postOpinion = (req, res) => {
    const opinion = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        traffic_light: req.body.opinion_tl,
        grade: req.body.opinion_grade,
        will_buy: req.body.opinion_willbuy,
        // defective: req.body.opinion_defective, // canceled
        // type: req.body.opinion_type, // canceled
        created_date: req.body.opinion_date,
        points_granted: null
    };


    // convert string null to real null
    if(opinion.will_buy === 'null') {opinion.will_buy = null;}
    // if(opinion.defective === 'null') {opinion.defective = null;} // canceled
    // if(opinion.type === 'null') {opinion.type = null;} // canceled

    console.log('--- opinion ---');
    console.log(opinion);

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const insertOpinion = (opinionData) => {
        console.log(`insertOpinion -> points_granted: ${opinionData.points_granted}`);
        return db.query(`INSERT INTO prody.OPINIONS (prod_barcode, user_id, created_date, traffic_light, grade, will_buy, points_granted) 
                    values (?,?,?,?,?,?,?)`,
                    [opinionData.prod_barcode, opinionData.user_id, opinionData.created_date, opinionData.traffic_light, opinionData.grade, opinionData.will_buy, opinionData.points_granted]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };

    getProductPoints(opinion.prod_barcode)
        .then( ([rows, fieldData]) => {
            opinion.points_granted = rows[0].points_granted;
            return insertOpinion(opinion);})
        .then( () => {return updatePoints(opinion.user_id,opinion.points_granted);})
        .then( () => {res.status(200).send({points_granted: opinion.points_granted});})
        .catch(err => res.status(404).send(`prody error: ${err}`));

    /*insertOpinion(opinion)
        .then(() => {return getProductPoints(opinion.prod_barcode);})
        .then(([rows, fieldData]) => {
            console.log('points:' + rows[0].points_granted);
            return updatePoints(opinion.user_id,rows[0].points_granted);})
        .then(() => {return getProductPoints(opinion.prod_barcode);})
        .then(([rows, fieldData]) => {
            res.status(200).send(rows[0]);})
        .catch(err => res.status(404).send(`prody error: ${err}`));*/
};