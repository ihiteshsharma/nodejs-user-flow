require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const jwt = require('./_helpers/jwt.helper');

//writestream for writing logs in a file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(jwt());

app.use('/users', require('./users/users.controller'));

const port = process.env.SERVER_MODE === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, () => {
    console.log('Server Mode : ' + process.env.SERVER_MODE);
    console.log('Port : ' + port);
    console.log('Status: Listening');
});
