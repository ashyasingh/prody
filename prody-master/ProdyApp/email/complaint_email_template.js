function QnA(q, a, num) {
    if(q != null || a != null) {
        return (
            `<b>Question ${num}: </b> ${q} <br>
            <b>Answer ${num}: </b> ${a} <br>`
        );
    } else {
        return '';
    }
}

function comment(commentData) {
  if(commentData != null) {
      return `<b>Comments:</b> ${commentData} <br>`;
    } else {
        return '';
    }
}

function phone(phoneData) {
    if(phoneData != null) {
    return `${phoneData}`;
    } else {
        return '';
    }
}

exports.htmlEmail = (emailData) => {
        return `<html>
    <div>Hi, this consumer's feedback was sent using Prody.</div>
    <br>
    <b>Product:</b> <br>
    Barcode: ${emailData.prod_barcode} <br>
    Description: ${emailData.prod_desc} <br>
    <a href="http://prody.me/p/${emailData.prod_barcode}">Link to product page</a><br>
    <br>
    <b>Issue:</b> ${emailData.issue_desc} <br>
    <br>
    ${QnA(emailData.q1_desc, emailData.a1, 1)}
    ${QnA(emailData.q2_desc, emailData.a2, 2)}
    ${QnA(emailData.q3_desc, emailData.a3, 3)}
    ${QnA(emailData.q4_desc, emailData.a4, 4)}
    ${comment(emailData.comments)}    
    <br>
    <b>Consumer Information:</b><br>
    <b>Name:</b> ${emailData.first_name}<br>
    <b>Contact:</b> ${phone(emailData.phone)}<br>
    <b>Preferred contact by:</b> ${emailData.preferred_contact_method}
    <br><br>
    For more information, please contact us at contact@prody.me
</html>`
};