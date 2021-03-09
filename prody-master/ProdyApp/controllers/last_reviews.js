const db = require('../util/database');

exports.getLastReview =  (req, res) => {

    
    const getReviewsVW = () => {
        return db.query(`SELECT * FROM prody.vw_api_last_reviews`)
        };

    getReviewsVW()
    .then(([rows, fieldData]) => {
        if(rows.length == 0) {
            res.status(404).send('prody error: Product not found.');
        }
        else {res.send(rows)}
        })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};