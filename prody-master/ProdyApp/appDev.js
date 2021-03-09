const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser'); // for landing page form

const mysqlConn = mysql.createConnection({
  host     : '62.0.53.142', // dev
 // host     : 'localhost', // prod
    user     : 'admin',
    password : '123$qaZX',
    database : 'prody'
  });

// ----- mySQL -----
mysqlConn.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;}
    console.log('connected to mySQL as id ' + mysqlConn.threadId);
  });

// ----- HTTP -----
app.use(express.json()); // for posting json objects
app.use(express.static('landing_page'));
app.use(bodyParser.urlencoded({ extended: true })); // for landing page form

app.get('/', (req,res) => {
    res.sendfile('./landing_page/index.html');
});

app.post('/submit', (req, res) => { // landing page
    console.log(`landing page submit: ${req.body.email}`);
    let newDate = dateFormat(new Date, "yyyy-mm-dd HH:MM:ss");
    mysqlConn.query(`INSERT INTO prody.landingpage (email, created_date) 
                    values ('${req.body.email}', '${newDate}')`, 
         function (error, results, fields) {
             if (error) {
                 res.status(400).send(`error submitting the email`); // 400 bad request
                 return console.log(`############ ${error}`);}
                 else {res.send('submitted.');}
    });
    
});

app.get('/api/product/:id', (req, res) => {
    let isnum = /^\d+$/.test(req.params.id);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${req.params.id} error 400`);
        return res.status(400).send('prody error: Product barcode not legal.'); // 400 bad request
        };
    
    mysqlConn.query(`SELECT * FROM prody.vw_api_product where prod_barcode = ${req.params.id}`, 
        function (error, results, fields) {
            if (error) return console.log(`############ ${error}`);
            if(results.length == 0) {
                
                // save unfamiliar product barcode
                mysqlConn.query(`INSERT INTO prody.PRODUCTS (barcode, classification)
                values ('${req.params.id}', 1)`, 
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return res.status(404).send('prody error: the new product can not be saved.');}     
                    else {      
                        console.log(`product ${req.params.id} error 404`);
                        return res.status(404).send('prody error: Product barcode not found.');
                        }
                });
            } else {
                res.send(results[0]);
            }
    });
});

app.post('/api/registration', (req, res, next) => {
    if(!req.body.email) {return res.status(400).send('email is missing !');} // 400 bad request
    const user = {
        email: req.body.email,
        password: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        country_id: req.body.country,
        created_date: req.body.date
    };
    console.log(user);
    mysqlConn.query(`select count(email) as emailCount from prody.USERS where email = '${user.email}'`,
        function (error, results, fields) {
            if (error) {
                res.status(400).send(`prody error: unable to check if email exist.`); // 400 bad request
                return console.log(`############ ${error}`);
            }
            else {
                if(results[0].emailCount == 1) {
                    res.status(400).send(`prody error: email already exist.`); // 400 bad request
                }

                else {
                    // create user
                    mysqlConn.query(`INSERT INTO prody.USERS (email, password, first_name, last_name, birthdate, gender, country_id, created_date) 
                    values ('${user.email}', '${user.password}', '${user.first_name}', '${user.last_name}', '${user.birthdate}',
                    ${user.gender}, '${user.country_id}', '${user.created_date}')`, 
                    function (error, results, fields) {
                        if (error) {
                        res.status(400).send(`prody error: registration failed.`); // 400 bad request
                        return console.log(`############ ${error}`);}
                    });

                    // return user id
                    mysqlConn.query(`select id from prody.USERS where email = '${user.email}'`,
                        function (error, results, fields) {
                            if (error) {
                            res.status(400).send(`prody error: cant find user id.`); // 400 bad request
                            return console.log(`############ ${error}`);
                            }
                            else {res.send(results[0]);}
                    });
                }
                
            }
        }
    );
});

app.post('/api/feedback', (req, res) => {
    if(!req.body.feedback_subject || !req.body.feedback_content) {
        return res.status(400).send('feedbak Missing !'); // 400 bad request
    } 
    const feedback = {
        user_id: req.body.user_id,
        subject: req.body.feedback_subject,
        content: req.body.feedback_content,
        created_date: req.body.feedback_date
    };
    console.log(feedback);
    mysqlConn.query(`INSERT INTO prody.FEEDBACK (user_id, created_date, subject, content) 
                    values (${feedback.user_id}, '${feedback.created_date}', '${feedback.subject}', '${feedback.content}')`, 
        function (error, results, fields) {
            if (error) {
                res.status(400).send(`Feedback wasn\'t sent because of an error.`); // 400 bad request
                return console.log(`############ ${error}`);}
                else {res.send('Your feedbak was sent.');}
     });
});

app.post('/api/opinion', (req, res) => {
    const opinion = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        traffic_light: req.body.opinion_tl,
        grade: req.body.opinion_grade,
        will_buy: req.body.opinion_willbuy,
        defective: req.body.opinion_defective,
        type: req.body.opinion_type,
        created_date: req.body.opinion_date
    };
    console.log(opinion);
    mysqlConn.query(`INSERT INTO prody.OPINIONS (prod_barcode, user_id, traffic_light, grade, will_buy, defective, type, created_date) 
                    values ('${opinion.prod_barcode}', ${opinion.user_id}, '${opinion.traffic_light}', ${opinion.grade}, 
                    ${opinion.will_buy}, ${opinion.defective}, ${opinion.type}, '${opinion.created_date}')`, 
        function (error, results, fields) {
            if (error) {
                res.status(400).send(`Opinion wasn\'t sent because of an error.`); // 400 bad request
                return console.log(`############ ${error}`);
            } else {res.send('Your opinios was sent.');}
    });
   
});

app.post('/api/share', (req, res) => {
    if(!req.body.share_application || !req.body.share_content) {
        return res.status(400).send('Missing Data !'); // 400 bad request
    } 
    const share = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        shared_app: req.body.share_application,
        is_fixed_message: req.body.share_fix_message,
        content: req.body.share_content,
        created_date: req.body.share_date
    };
    console.log(share);
    mysqlConn.query(`INSERT INTO prody.SHARE (user_id, prod_barcode, shared_app, is_fixed_message, content, created_date) 
                    values (${share.user_id}, '${share.prod_barcode}', '${share.shared_app}', ${share.is_fixed_message},
                    '${share.content}', '${share.created_date}
                    ')`, 
        function (error, results, fields) {
            if (error) {
                res.status(400).send(`Share wasn\'t sent because of an error.`); // 400 bad request
                return console.log(error);}
                else {res.send('Shared.');}
     });
    
});

app.get('/api/product_features/:id', (req, res) => { // for complaint feature
    console.log(`product ${req.params.id}`);
    let isnum = /^\d+$/.test(req.params.id);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${req.params.id} error 400`);
        return res.status(400).send('Product barcode not legal.'); // 400 bad request
        };
    
    mysqlConn.query(`SELECT * FROM prody.vw_api_product_features where prod_barcode = ${req.params.id}`, 
        function (error, results, fields) {
            if (error) return console.log(`############ ${error}`);
            if(results.length == 0) {
                console.log(`product ${req.params.id} error 404`);
                return res.status(404).send('Product barcode or features not found.');
            };
        res.send(results);
    });
});

app.get('/api/complaint_q/:feature_id', (req, res) => { // complaint feature - return complaints questions by feature id
    console.log(`feature_id ${req.params.feature_id}`);
    let isnum = /^\d+$/.test(req.params.feature_id);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${req.params.feature_id} error 400`);
        return res.status(400).send('Product barcode not legal.'); // 400 bad request
        };
    
    mysqlConn.query(`SELECT * FROM vw_api_complaint_q where feature_id = ${req.params.feature_id}`, 
        function (error, results, fields) {
            if (error) return console.log(`############ ${error}`);
            if(results.length == 0) {
                console.log(`product ${req.params.feature_id} error 404`);
                return res.status(404).send('feature or complaint questions not found.');
            };
        res.send(results);
    });
});

app.post('/api/complaint', (req, res) => { // for complaint feature
    if(!req.body.prod_barcode || !req.body.user_id) {
        return res.status(400).send('Missing Data !'); // 400 bad request
    } 
    const complaint = {
        prod_barcode: req.body.prod_barcode,
        user_id: req.body.user_id,
        consumed: req.body.complaint_consumed,
        expired: req.body.complaint_expired,
        country_id: req.body.country_id,
        q1_id: req.body.q1_id,
        q2_id: req.body.q2_id,
        q3_id: req.body.q3_id,
        q4_id: req.body.q4_id,
        a1: req.body.a1,
        a2: req.body.a2,
        a3: req.body.a3,
        a4: req.body.a4,
        created_date: req.body.complaint_date
    };
    console.log(complaint);
    mysqlConn.query(`INSERT INTO prody.COMPLAINTS (prod_barcode, user_id, consumed, expired, country_id, q1_id, q2_id,
        q3_id, q4_id, a1, a2, a3, a4, created_date) 
                    values ('${complaint.prod_barcode}', ${complaint.user_id}, ${complaint.consumed}, ${complaint.expired},
                    '${complaint.country_id}', ${complaint.q1_id}, ${complaint.q2_id}, ${complaint.q3_id}, ${complaint.q4_id},
                    '${complaint.a1}', '${complaint.a2}', '${complaint.a3}', '${complaint.a4}', '${complaint.created_date}')`, 
        function (error, results, fields) {
            if (error) {
                res.status(400).send(`complaint wasn\'t sent because of an error.`); // 400 bad request
                return console.log(error);}
                else {res.send('complaint sent.');}
     });
    
});

app.use((req, res, next) => { // handle all other request from client
    res.status(404).send('Page not found');
});

 app.listen(3000, () => console.log('listening to port 3000')); // dev
// app.listen(80, () => console.log('listening to port 80')); // prod