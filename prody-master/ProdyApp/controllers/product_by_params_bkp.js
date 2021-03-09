const db = require('../util/database');
const logger = require('../services/logger');
const dateFormat = require('dateformat');

exports.getProduct =  (req, res) => {
    // console.log(`barcode:${req.params.barcode} country:${req.params.country} user:${req.params.user}`)
    logger.writeLog(`---  getProduct --- barcode:${req.params.barcode} country:${req.params.country} user:${req.params.user}`);
    let isnum = /^\d+$/.test(req.params.barcode);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${req.params.barcode} error 400`);
        return res.status(400).send('prody error: Product barcode not legal.'); // 400 bad request
        };

    const insertProductRequestLog = (user_id, barcode, user_country_id, response_code, prod_classification) => {
        const created_date = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        return db.query(`INSERT INTO prody.PRODUCT_REQUESTS_LOG (user_id, barcode, user_country_id, response_code, prod_classification, created_date)
            VALUES (?,?,?,?,?,?)`, [user_id, barcode, user_country_id, response_code, prod_classification, created_date])
    };

    const getProductVW = ( barcode, country ) => {
        return db.query(`SELECT * FROM prody.vw_api_product_with_brand_products WHERE prod_barcode = ? and country_id = ? and classification = 0`,
            [barcode, country])
        };

    const getProductClassification = ( barcode, country ) => {
        return db.query(`SELECT * FROM vw_api_product_classification WHERE barcode = ? and country_id = ? and classification is not null`, [barcode, country])
    };


    

    getProductClassification(req.params.barcode, req.params.country)
    .then(([rows, fieldData]) => {
        // console.log(rows.length);
        if(rows.length === 0)
        {
            return insertProductRequestLog(req.params.user, req.params.barcode, req.params.country, 404, null)
            .then(([rows, fieldData]) => {res.status(404).send('Product not found')})
        }
        else {
            return getProductClassification(req.params.barcode, req.params.country)
            .then(([rows, fieldData]) => {
                if(rows[0].classification !== 0) {
                    console.log(`response_code:${rows[0].response_code} classification:${rows[0].classification}`);
                    return insertProductRequestLog(req.params.user, req.params.barcode, req.params.country, rows[0].response_code, rows[0].classification)
                        .then(([rows, fieldData]) => {return getProductClassification(req.params.barcode, req.params.country)})
                        .then(([rows, fieldData]) => {res.status(rows[0].response_code).send(rows[0].response_content)})
                }
                else {
                    return insertProductRequestLog(req.params.user, req.params.barcode, req.params.country, rows[0].response_code, rows[0].classification)
                        .then(([rows, fieldData]) => {return getProductVW(req.params.barcode, req.params.country)})
                    .then(([rows, fieldData]) => {res.send(rows[0])})
                }
            })

        }
    })
        .catch(err => res.status(404).send(`prody error: ${err}`));
};