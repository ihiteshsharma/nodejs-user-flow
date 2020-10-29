require('rootpath')();
const fs = require('fs');
const path = require('path');

const serverLogPath = path.join(__dirname, "..", "server.log");
var d = new Date().toISOString();

var serverLogStream = fs.createWriteStream(serverLogPath, {flags:'a'});

function logToFile(type, description){
    serverLogStream.write(d + " --- " + type + " --- " + description + " \r\n");
}

module.exports = logToFile;