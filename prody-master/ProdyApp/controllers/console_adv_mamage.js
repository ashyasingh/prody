const db = require('../util/database');

exports.postUpdateAdvs = (req,res) => {

    const updateAdvs = () => {
        return db.query(``)
    };

    updateAdvs()
        .then(([rows, fieldData]) => {res.send(rows)})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};