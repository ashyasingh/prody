// <<<<<<<<<<<<<<<< not in use >>>>>>>>>>>>>>>>>>

const db = require('../util/database');

exports.getSocialOpiniosAndReviews =  (req, res) => {

    const getData = (barcode) => {
        return db.query(`SELECT * FROM prody.vw_api_social_opinions_and_reviews WHERE prod_barcode = ?`, [barcode])
    };

    getData(req.params.id)
        .then(([rows, fieldData]) => {
            if (rows.length == 0) {
                res.status(404).send('prody error: Product not found.');
                return insertNewProduct(req.params.id);
            } else {
                return res.send(rows[0])
            }
        })
        .catch(err => res.status(404).send(`prody error: ${err}`));
};