const db = require('../util/database');

exports.postReview = (req, res) => {

    const review = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        created_date: req.body.review_date,
        review_content: req.body.review_content,
        anonymous: req.body.anonymous,
        points_granted: null
    };

    console.log('--- req review ---');
    console.log(review);

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };


    const insertReview = (reviewData) => {
        console.log(`insertReview -> points_granted:${reviewData.points_granted}`);
        return db.query(`INSERT INTO prody.REVIEWS (user_id, prod_barcode, created_date, review_content, anonymous, points_granted) VALUES (?,?,?,?,?,?)`,
                [reviewData.user_id, reviewData.prod_barcode, reviewData.created_date, reviewData.review_content, reviewData.anonymous, reviewData.points_granted]);
    };

    getProductPoints(review.prod_barcode)
        .then( ([rows, fieldData]) => {
            review.points_granted = rows[0].points_granted * 2;
            return insertReview(review);})
        .then( () => {
            return updatePoints(review.user_id,review.points_granted);})
        .then( () => {res.status(200).send({points_granted: review.points_granted});})
        .catch(err => res.status(404).send(`prody error: ${err}`));

    /*insertReview(review)
        .then(() => {return getProductPoints(review.prod_barcode);})
        .then(([rows, fieldData]) => {
            return updatePoints(review.user_id,rows[0].points_granted * 2);})
        .then(() => {return getProductPoints(share.prod_barcode);})
        .then(([rows, fieldData]) => {
            res.status(200).send(rows[0]);})
        .catch(err => res.status(404).send(`prody error: ${err}`));*/
};