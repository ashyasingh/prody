const db = require('../util/database');

exports.getProductOpinionSummary =  (req, res) => {

    
    const getProductOpinionSummaryVW = () => {
        return db.query(`SELECT * FROM prody.vw_api_product_opinion_summary`)
        };

    getProductOpinionSummaryVW()
    .then(([rows, fieldData]) => {
        if(rows.length == 0) {
            res.status(404).send('prody error: Product not found.');
        }
        else {res.send(rows)}
        })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};