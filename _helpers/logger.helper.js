require('rootpath')();
const fs = require('fs');
const path = require('path');

const logpath = path.join(__dirname, "..", "server.log")
var d = new Date().toISOString();
var stream = fs.createWriteStream(logpath, {flags:'a'});

function logToFile(type, description){
    stream.write(d + " --- " + type + " --- " + description + " \r\n");
}

module.exports = logToFile;