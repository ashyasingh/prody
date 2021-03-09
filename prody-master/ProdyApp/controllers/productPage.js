const db = require('../util/database');

exports.getCountries = (req,res) => {

    const getProductVW = () => {
        return db.query(`select * from COUNTRIES`)
    };

    getProductVW()
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getProductPageInfo = (req,res) => {

    const getProductVW = ( id ) => {
        return db.query(`SELECT * FROM prody.vw_product_page_info WHERE prod_barcode = ?`, [id])
    };

    getProductVW(req.params.id)
        .then(([rows, fieldData]) => {res.send(rows[0])})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getProductPageNutrition = (req,res) => {

    const getProductVW = ( id ) => {
        return db.query(`SELECT * FROM prody.vw_product_page_nutrition WHERE prod_barcode = ?`, [id])
        };

    getProductVW(req.params.id)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getProductPageIngredients = (req,res) => {

    const getProductVW = ( id ) => {
        return db.query(`SELECT ingredients FROM prody.vw_api_product_ingredients WHERE prod_barcode = ?`, [id])
        };

    getProductVW(req.params.id)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getProductPageTag = (req,res) => {

    const getProductVW = ( country, barcode ) => {
        return db.query(`SELECT * FROM prody.vw_product_page_tag WHERE barcode = ? AND country_id = ?`, [barcode, country])
    };

    getProductVW(req.params.country, req.params.barcode)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};


exports.getProductPageScoreAndBetterProducts = (req,res) => {

    const getProductVW = ( country, barcode  ) => {
        return db.query(`SELECT * FROM prody.vw_product_page_better_products WHERE barcode = ? AND country_id = ? AND better_classification = 0`, [barcode, country])
    };

    getProductVW(req.params.country, req.params.barcode)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getProductPageProductDropdown = (req,res) => {
    const getProductVW = ( country, barcode ) => {
	    const searchValue = `%${barcode}%`;
        return db.query(`SELECT * FROM prody.offline_vw_product_page_product_dropdown WHERE classification = 0 AND barcode_desc_eng like ? AND country_id = ? ORDER BY barcode_desc_eng LIMIT 20`, [searchValue, country])
    };

    getProductVW(req.params.country, req.params.barcode)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};


exports.getProductPageAdv = (req,res) => {

    const getProductVW = ( barcode, country ) => {
        return db.query(`SELECT * FROM prody.vw_product_page_adv WHERE barcode = ? AND country_id = ?`, [barcode, country])
    };

    getProductVW(req.params.barcode, req.params.country)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getProductPageBrandProducts = (req,res) => {

    const getProductVW = ( country, brand ) => {
        return db.query(`SELECT * FROM prody.vw_product_page_brand_products WHERE classification = 0 AND country_id = ? AND brand_id = ?`, [country, brand])
    };

    getProductVW(req.params.country, req.params.brand)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};