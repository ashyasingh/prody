//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");
// const config = require("./auth.config");
const db = require("backend/backend/app.js");
// const dateFormat = require('dateformat');

exports.getproducts = () => {
  const query = "INSERT INTO PRODUCTS (ID, Name, Company_ID) VALUES (100, 'Blank', 1)"
  return db.query(query)
}

console.log(getproducts())