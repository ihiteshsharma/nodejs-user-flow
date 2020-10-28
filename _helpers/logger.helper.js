const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'server.log')
var d = new Date().toISOString();

function logToFile(type, description){
    fs.appendFile(filePath, d + " --- " + type + " --- " + description);
}

module.exports = logToFile;