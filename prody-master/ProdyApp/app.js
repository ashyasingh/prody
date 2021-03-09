const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // for landing page form

const apiRoutes = require('./routes/api');
const publicRoutes = require('./routes/general');
const authRoutes = require('./routes/auth.route');

app.use(express.json()); // for posting json objects
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/console_fe'))); // console fe
app.use(bodyParser.urlencoded({ extended: false })); // for landing page form

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(apiRoutes); // -- API --
app.use(publicRoutes); // -- public --
app.use(authRoutes); // -- authentication --

const PORT = process.env.PORT;

 app.listen(4000, () => console.log('listening to port 4000')); // dev
//  app.listen(PORT, () => console.log(`listening to port ${PORT}`)); // prod