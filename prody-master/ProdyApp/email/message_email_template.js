function message_title(message_issue) {
  if(message_issue === 'Question') {return 'The consumer wants to ask you a question:';}
  if(message_issue === 'Flatter') {return 'The consumer wants to flatter regarding his experience:';}
  if(message_issue === 'Idea') {return 'The consumer wants to share his idea with you:';}
}

function phone(phoneData) {
    if(phoneData != null) {
    return `${phoneData}`;
    } else {
        return '';
    }
}

function break_formatted(string) {
    // return string.replace('\n', '<br>');
    return string.split('\n').join('<br>');

}

exports.htmlEmail = (emailData) => {
        return `<html>
    <div>Hi, this consumer's message was sent using Prody.</div>
    <br>
    <b>Product:</b> <br>
    Barcode: ${emailData.prod_barcode} <br>
    Description: ${emailData.prod_desc} <br>
    <a href="http://prody.me/p/${emailData.prod_barcode}">Link to product page</a><br>
    <br>
    <b>${message_title(emailData.message_issue)}</b>
    <br>
    ${break_formatted(emailData.message_content)}
    <br><br>
    <b>Consumer Information:</b><br>
    <b>Name:</b> ${emailData.first_name}<br>
    <b>Contact:</b> ${phone(emailData.phone)}<br>
    <b>Preferred contact by:</b> ${emailData.preferred_contact_method}
    <br><br>
    For more information, please contact us at contact@prody.me
</html>`
};