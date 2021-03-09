const db = require('../util/database');
const dateFormat = require('dateformat');
const fsPromises = require('fs').promises;
const email = require('../email/complaint_email');
const logger = require('../services/logger');

exports.getProductIssues = (req, res) => { // for complaint issue
    console.log(`product ${req.params.id}`);
    let isnum = /^\d+$/.test(req.params.id);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${req.params.id} error 400`);
        return res.status(400).send('Product barcode not legal.'); // 400 bad request
        };
    
    const productIssues = ( id ) => {
        return db.query(`SELECT * FROM prody.vw_api_product_issues where prod_barcode = ?`, [id]);
    };
    
    productIssues(req.params.id)
    .then(([rows, fieldData]) => {
        if(rows.length == 0) {
            return res.status(404).send('Product barcode or features not found.');
        } else {
            res.send(rows); 
        }
    })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.getComplaintQ = (req, res) => { // complaint feature - return complaints questions by issue id
    console.log(`issue_id ${req.params.issue_id}`);
    let isnum = /^\d+$/.test(req.params.issue_id);  // barcode is number validation
    if(isnum == false) {
        console.log(`product ${req.params.issue_id} error 400`);
        return res.status(400).send('Product barcode not legal.'); // 400 bad request
        };
    
    const complaintQ = ( id ) => {
        return db.query(`SELECT * FROM vw_api_complaint_q where issue_id = ?`, [id]);
    };

    complaintQ(req.params.issue_id)
    .then(([rows, fieldData]) => {
        if(rows.length == 0) {
            return res.status(404).send('issue or complaint questions not found.');
        } else {
            res.send(rows); 
        }
    })
    .catch(err => res.status(404).send(`prody error: ${err}`));
};

exports.postComplaint = (req, res) => { // for complaint issue
     let data = JSON.parse(req.body.json); // for android app
     // let data = req.body; // for postman
   
    if(!data.prod_barcode || !data.user_id) {
        return res.status(400).send('Missing barcode or user id !'); // 400 bad request
    } 

    const complaint = {
        id: null,
        prod_barcode: data.prod_barcode,
        user_id: data.user_id,
        expired: data.complaint_expired,
        country_id: data.country_id,
        issue_id: data.issue_id,
        owner_id: null,
        q1_id: data.q1_id,
        q2_id: data.q2_id,
        q3_id: data.q3_id,
        q4_id: data.q4_id,
        a1: data.a1,
        a2: data.a2,
        a3: data.a3,
        a4: data.a4,
        comments: data.comments,
        created_date: data.complaint_date,
        preferred_contact_method: data.preferred_contact_method
    };

    // convert string null to real null
    if(complaint.q1_id === 'null') {complaint.q1_id = null;}
    if(complaint.q2_id === 'null') {complaint.q2_id = null;}
    if(complaint.q3_id === 'null') {complaint.q3_id = null;}
    if(complaint.q4_id === 'null') {complaint.q4_id = null;}
    if(complaint.a1 === 'null') {complaint.a1 = null;}
    if(complaint.a2 === 'null') {complaint.a2 = null;}
    if(complaint.a3 === 'null') {complaint.a3 = null;}
    if(complaint.a4 === 'null') {complaint.a4 = null;}

    complaint.id = complaint.user_id + dateFormat(complaint.created_date, "yyyymmddHHMMss"); // generate complaint id
    
    const getOwner = (prod_barcode) =>{
        return db.query(`SELECT owner_id FROM prody.vw_current_owner where prod_barcode = ?`, [prod_barcode]);
    };

    const getEmailData = (id) =>{
        return db.query(`SELECT * FROM prody.vw_api_complaint_email_data where complaint_id = ?`, [id]);
    };

    const insertComplaint = (id, prod_barcode, user_id, expired, country_id, issue_id, owner_id, q1_id, q2_id, q3_id, q4_id, a1, a2, a3, a4, comments, created_date, preferred_contact_method) => {
        db.query(`INSERT INTO prody.COMPLAINTS (id, prod_barcode, user_id, expired, country_id, issue_id, owner_id,
            q1_id, q2_id, q3_id, q4_id, a1, a2, a3, a4, comments, created_date, preferred_contact_method) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [id, prod_barcode, user_id, expired, country_id, issue_id, owner_id, q1_id, q2_id, q3_id, q4_id, a1, a2, a3, a4, comments, created_date, preferred_contact_method]);
    };

    const getProductPoints = (prod_barcode) => {
        console.log('getProductPoints -> prod_barcode:' + prod_barcode);
        return db.query(`SELECT points_granted FROM prody.PRODUCTS WHERE barcode = ?`, [prod_barcode]);
    };

    const updatePoints = (userID, addPoints) => {
        console.log(`updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };

    const writeFile = (files) => {
            files.forEach( (file) => {
                const path = './complaintPics/';
                console.log(complaint.id + file.fieldname + '.jpg');
                fsPromises.writeFile(path + complaint.id + file.fieldname + '.jpg', file.buffer);
            })
    };
    


    getOwner(complaint.prod_barcode)
        .then(([rows, fieldData]) => {
            if(rows.length == 0) {res.status(404).send('prody error: Owner not found.');}
            else {
                return insertComplaint(
                complaint.id,
                complaint.prod_barcode,
                complaint.user_id,
                complaint.expired,
                complaint.country_id,
                complaint.issue_id,
                rows[0].owner_id,
                complaint.q1_id,
                complaint.q2_id,
                complaint.q3_id,
                complaint.q4_id,
                complaint.a1,
                complaint.a2,
                complaint.a3,
                complaint.a4,
                complaint.comments,
                complaint.created_date,
                complaint.preferred_contact_method);
            }
        })
        .then(() => {return getProductPoints(complaint.prod_barcode);})
        .then(([rows, fieldData]) => {return updatePoints(complaint.user_id,rows[0].points_granted * 0);})
        .then(() => {return writeFile(req.files);})
        .then(() => {return getEmailData(complaint.id);})
        .then(([rows, fieldData]) => {
            const emailData = {
                prod_barcode: rows[0].prod_barcode,
                prod_desc: rows[0].prod_desc,
                issue_desc: rows[0].issue_desc,
                email_service: rows[0].email_service,
                q1_desc: rows[0].q1_desc,
                q2_desc: rows[0].q2_desc,
                q3_desc: rows[0].q3_desc,
                q4_desc: rows[0].q4_desc,
                a1: rows[0].a1,
                a2: rows[0].a2,
                a3: rows[0].a3,
                a4: rows[0].a4,
                expired: rows[0].expired,
                comments: rows[0].comments,
                first_name: rows[0].first_name,
                last_name: rows[0].last_name,
                email: rows[0].email,
                phone: rows[0].phone,
                preferred_contact_method: rows[0].preferred_contact_method,
                pic1: complaint.id + '_product.jpg',
                pic2: complaint.id + '_lot.jpg',
            };
            logger.writeLog('---  complaint email data --- ' + JSON.stringify(emailData, null, 2));
            setTimeout(()=>{
                email.sendEmail(emailData);},1000);
            return res.send('complaint sent.');
        })
        .catch(err => res.status(404).send(`prody error: ${err}`));
};