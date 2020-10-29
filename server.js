require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sendResponse = require('./_helpers/response.helper');
const jwt = require('./_helpers/jwt.helper');

//writestream for writing logs in a file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' });

//define custom id for every request that hits the server and log it
morgan.token('id', function getId(req) {
    return req.id;
});

app.use(assignId);
app.use(morgan(':id :remote-addr :date[iso] :method :url :status :response-time', { stream: accessLogStream }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwt());

app.get('/', function(req,res,next) {
    sendResponse(req,res,next, 200, "Hello World");
  });

app.use('/users', require('./users/users.controller'));

const port = process.env.SERVER_MODE === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, () => {
    console.log('Server Mode : ' + process.env.SERVER_MODE);
    console.log('Port : ' + port);
    console.log('Status: Listening');
});

function assignId (req,res,next) {
    req.id = uuid.v4();
    next();
}