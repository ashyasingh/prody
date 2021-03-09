const fs = require('fs');
const path = require('path');
const dateFormat = require('dateformat');



exports.writeLog = (logContent) => {
    const logDate = dateFormat(new Date, "yyyy-mm-dd HH:MM:ss");
    fs.appendFile(path.join(__dirname, './','log.txt'), `\n ${logDate} ${logContent}`, function (err) {
    if (err) throw err;
    console.log('Log Updated!');
    });
};