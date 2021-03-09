// endpoint for whats app thumbnail

const path = require('path');
const fs = require('fs');


exports.getProductPic = (req,res) => {
    const filePath = path.join(__dirname, '../', 'public/img/products',req.params.id + '.jpeg');
    const defaultFilePath = path.join(__dirname, '../', 'public/img/products','default.jpeg');
    if(fs.existsSync(filePath)) {
        res.sendFile(filePath);
    }
    else {
        res.sendFile(defaultFilePath);
    }
};
