const path = require('path');


exports.getConsoleLoginPage = (req,res) => {
    res.sendFile(path.join(__dirname, '../console_fe','index.html'));
};