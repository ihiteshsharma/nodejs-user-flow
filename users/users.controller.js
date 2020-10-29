const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const sendResponse = require('../_helpers/response.helper');

function authenticateUser(req, res, next)  {
    userService.authenticate(req.body)
    .then( user => user ? sendResponse(req, res, next, 200, user) : sendResponse(req, res, next, 400, "Incorrect username or password"))
    .catch( err => {
        sendResponse(req,res,next, 400, "An error occured")
        next(err);
    });
}

function register(req, res, next) {
    userService.createUser(req.body)
    .then(() => sendResponse(req,res,next,200, {}))
    .catch(err => next(err));
};

function getAll(req,res,next) {
    userService.getAll(req.user.sub)
    .then( user => user ? sendResponse(200, user) : sendResponse(404, {}))
    .catch( err => next(err));
}


router.post('/authenticate', authenticateUser);
router.post('/signup', register);
router.get('/', getAll);

module.exports = router;