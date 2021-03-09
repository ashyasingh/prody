const db = require('../util/database');
const logger = require('../services/logger');
const dateFormat = require('dateformat');

exports.getProduct =  (req, res) => {
    const HEADER_VALUES = {
        barcode : req.headers.prod_barcode,
        user_id : req.headers.user_id,
        country : req.headers.user_country,
        product_request_source : req.headers.product_request_source,
        language : req.headers.language
    };

    // console.log(`barcode:${HEADER_VALUES.barcode} user:${HEADER_VALUES.user_id} country:${HEADER_VALUES.country} product_request_source:${HEADER_VALUES.product_request_source} language:${HEADER_VALUES.language}`)
    logger.writeLog(`---  getProduct --- barcode:${HEADER_VALUES.barcode} user:${HEADER_VALUES.user_id} country:${HEADER_VALUES.country} product_request_source:${HEADER_VALUES.product_request_source} language:${HEADER_VALUES.language}`);
    let isnum = /^\d+$/.test(HEADER_VALUES.barcode);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${HEADER_VALUES.barcode} error 400`);
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


    

    getProductClassification(HEADER_VALUES.barcode, HEADER_VALUES.country)
    .then(([rows, fieldData]) => {
        // console.log(rows.length);
        if(rows.length === 0)
        {
            return insertProductRequestLog(HEADER_VALUES.user_id, HEADER_VALUES.barcode, HEADER_VALUES.country, 404, null, HEADER_VALUES.product_request_source)
            .then(([rows, fieldData]) => {res.status(404).send('Product not found')})
        }
        else {
            return getProductClassification(HEADER_VALUES.barcode, HEADER_VALUES.country)
            .then(([rows, fieldData]) => {
                if(rows[0].classification !== 0) {
                    console.log(`response_code:${rows[0].response_code} classification:${rows[0].classification}`);
                    return insertProductRequestLog(HEADER_VALUES.user_id, HEADER_VALUES.barcode, HEADER_VALUES.country, rows[0].response_code, rows[0].classification, HEADER_VALUES.product_request_source)
                        .then(([rows, fieldData]) => {return getProductClassification(HEADER_VALUES.barcode, HEADER_VALUES.country)})
                        .then(([rows, fieldData]) => {res.status(rows[0].response_code).send(rows[0].response_content)})
                }
                else {
                    return insertProductRequestLog(HEADER_VALUES.user_id, HEADER_VALUES.barcode, HEADER_VALUES.country, rows[0].response_code, rows[0].classification, HEADER_VALUES.product_request_source)
                        .then(([rows, fieldData]) => {return getProductVW(HEADER_VALUES.barcode, HEADER_VALUES.country)})
                    .then(([rows, fieldData]) => {res.send(rows[0])})
                }
            })

        }
    })
        .catch(err => res.status(404).send(`prody error: ${err}`));
};