const db = require('../util/database');

exports.getBrandPageBrandDropdown = (req,res) => {
    const getData = ( brand ) => {
	    const searchValue = `%${brand}%`;
        return db.query(`SELECT * FROM prody.BRANDS WHERE desc_eng like ? OR desc_eng like ? ORDER BY desc_heb LIMIT 20`, [searchValue, searchValue])
    };

    getData(req.params.brand)
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};