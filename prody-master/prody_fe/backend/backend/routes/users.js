const path = require('path');
const mysql = require('mysql');

module.exports = function(app, connection){
    app.get('/', function(req, res){
      connection.query('SELECT * FROM SURVEYS', function(err, data){
        

      }
    }

}





/*
var express = require('express');
var router = express.Router();

// GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/