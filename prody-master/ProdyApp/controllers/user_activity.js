const db = require('../util/database');

exports.getUserActivity =  (req, res) => {

    /*
    const getUserActivityVW = ( id ) => {
        return db.query(`SELECT * FROM prody.vw_api_user_activity WHERE user_id = ?`, [id])
        };

    */
    const getUserActivityVW = ( id ) => {
        return db.query(`call sp_api_GetUserActivity(?)`, [id])
    };

    getUserActivityVW(req.params.id)
    .then(([rows, fieldData]) => {
        console.log(rows.length);
        if(rows.length == 0)
        {
            res.status(404).send('prody error: user not found.');

        }
        else {res.send(rows[0])}})
    .catch(err => res.status(404).send(`prody error: ${err}`));
};