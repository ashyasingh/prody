const jwt = require('jsonwebtoken');

const db = require('../util/database');

const ACCESS_TOKEN_SECRET = '7a6fcbc5563e3fa74e90792ead0a59d84003085db83bd1a3e5dd6935f00c3c89f81989f18f723b3974e760f4af872becc7f9dee81aca0ed9d71fc29e2cd8add6';

exports.createAccessToken = (req,res) => {

    // TODO: authenticate the user first !!!

    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {expiredIn: '5m'});

    res.json({accessToken: accessToken})

    // const getProductVW = () => {
    //     return db.query(`select * from COUNTRIES`)
    // };

    // getProductVW()
    //     .then(([rows, fieldData]) => {res.send(rows)})
    //     .catch(err => res.status(404).send(`prody error: ${err}`));
};

function authenticateToken(req, res, next) { // use it a middleware in the endpoints
    // token format : bearer <token>
    const authHeader = req.header['autorization'];
    const token = authHeader && authHeader.split(' ')[1];  // in case there's no token in the header, token will be undefined
    if (token == null) {return res.sendStatus(401)}

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {return res.sendStatus(403)}
        else {req.user = user}
        next()
    })
}