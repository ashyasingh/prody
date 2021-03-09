const db = require('../util/database');
const logger = require('../services/logger');
const dateFormat = require('dateformat');

exports.getProduct =  (req, res) => {

    // let data = JSON.parse(req.body.json); // for android app
    let data = req.body; // for postman

    const BODY_VALUES = {
        barcode : data.prod_barcode,
        user_id : data.user_id,
        country : data.user_country,
        product_request_source : data.product_request_source,
        language : data.language
    };

    console.log(`barcode:${BODY_VALUES.barcode} user:${BODY_VALUES.user_id} country:${BODY_VALUES.country} product_request_source:${BODY_VALUES.product_request_source} language:${BODY_VALUES.language}`)
    logger.writeLog(`---  getProduct --- barcode:${BODY_VALUES.barcode} user:${BODY_VALUES.user_id} country:${BODY_VALUES.country} product_request_source:${BODY_VALUES.product_request_source} language:${BODY_VALUES.language}`);
    let isnum = /^\d+$/.test(BODY_VALUES.barcode);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${BODY_VALUES.barcode} error 400`);
        return res.status(400).send('prody error: Product barcode not legal.'); // 400 bad request
        };

    const insertProductRequestLog = (user_id, barcode, user_country_id, response_code, prod_classification, source_type) => {
        const created_date = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        return db.query(`INSERT INTO prody.PRODUCT_REQUESTS_LOG (user_id, barcode, user_country_id, response_code, prod_classification, created_date, source_type)
            VALUES (?,?,?,?,?,?,?)`, [user_id, barcode, user_country_id, response_code, prod_classification, created_date, source_type])
    };

    const getProductVW = ( barcode, country ) => {
        return db.query(`SELECT * FROM prody.vw_api_product_with_brand_products WHERE prod_barcode = ? and country_id = ? and classification = 0`,
            [barcode, country])
        };

    const getProductClassification = ( barcode, country ) => {
        return db.query(`SELECT * FROM vw_api_product_classification WHERE barcode = ? and country_id = ? and classification is not null`, [barcode, country])
    };


    

    getProductClassification(BODY_VALUES.barcode, BODY_VALUES.country)
    .then(([rows, fieldData]) => {
        // console.log(rows.length);
        if(rows.length === 0)
        {
            return insertProductRequestLog(BODY_VALUES.user_id, BODY_VALUES.barcode, BODY_VALUES.country, 404, null, BODY_VALUES.product_request_source)
            .then(([rows, fieldData]) => {res.status(404).send('Product not found')})
        }
        else {
            return getProductClassification(BODY_VALUES.barcode, BODY_VALUES.country)
            .then(([rows, fieldData]) => {
                if(rows[0].classification !== 0) {
                    console.log(`response_code:${rows[0].response_code} classification:${rows[0].classification}`);
                    return insertProductRequestLog(BODY_VALUES.user_id, BODY_VALUES.barcode, BODY_VALUES.country, rows[0].response_code, rows[0].classification, BODY_VALUES.product_request_source)
                        .then(([rows, fieldData]) => {return getProductClassification(BODY_VALUES.barcode, BODY_VALUES.country)})
                        .then(([rows, fieldData]) => {res.status(rows[0].response_code).send(rows[0].response_content)})
                }
                else {
                    return insertProductRequestLog(BODY_VALUES.user_id, BODY_VALUES.barcode, BODY_VALUES.country, rows[0].response_code, rows[0].classification, BODY_VALUES.product_request_source)
                        .then(([rows, fieldData]) => {return getProductVW(BODY_VALUES.barcode, BODY_VALUES.country)})
                    .then(([rows, fieldData]) => {res.send(rows[0])})
                }
            })

        }
    })
        .catch(err => res.status(404).send(`prody error: ${err}`));
};