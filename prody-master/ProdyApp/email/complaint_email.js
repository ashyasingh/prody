const API_KEY = '3c5f0ba79ae2a316e71867995e31d165-2416cf28-80eb6f96';
// const DOMAIN = 'sandbox71dfef071c7d4d01b3ad3bcfbce3e41a.mailgun.org';
const DOMAIN = 'mg.prody.me';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const emailTamplate = require('./complaint_email_template');
// const path = require('path');


exports.sendEmail = (emailData) => {
  const emailBody = emailTamplate.htmlEmail(emailData);
  const filepath1 = `./complaintPics/${emailData.pic1}`;
  const filepath2 = `./complaintPics/${emailData.pic2}`;
  const to_address = emailData.email_service;

  // console.log(emailBody);
  const data = {
    from: 'info@mg.prody.me',
    to: to_address,
    subject: 'Prody: Consumer Feedback',
    html: emailBody,
    attachment: [filepath1,filepath2]
  };
  console.log(data);
  console.log('-------%%%%--------');

  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log('---------');
    console.log(body);
  });
};