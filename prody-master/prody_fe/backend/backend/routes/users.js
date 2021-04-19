const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("./auth.config");
const db = require("../util/database");
const dateFormat = require('dateformat');

exports.getproducts = () => {
  const query = "INSERT INTO PRODUCTS (ID, Name, Company_ID) VALUES (100, 'Blank', 1)"
  return db.query(query)
}

getproducts()

/*const path = require('path');
const mysql = require('mysql');

module.exports = function(app, connection){
    app.get('/', function(req, res){
      connection.query('SELECT * FROM SURVEYS', function(err, data){
        (err)?res.send(err):res.json{{users: data}};
      });
    });

}




var express = require('express');
var router = express.Router();

// GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/