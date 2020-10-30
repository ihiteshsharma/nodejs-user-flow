const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const sendResponse = require('../_helpers/response.helper');

authenticateUser = (req, res, next) => {
    userService.authenticate(req.body)
    .then( user => user ? sendResponse(req, res, next, 200, user) : sendResponse(req, res, next, 400, "Incorrect username or password"))
    .catch( err => {
        sendResponse(req,res,next, 400, "An error occured")
        next(err);
    });
}

signup = (req, res, next) => {
    userService.createUser(req.body)
    .then(() => sendResponse(req,res,next,200, {}))
    .catch(err => next(err));
};

getAll = (req,res,next) => {
    userService.getAll()
    .then( user => user ? sendResponse(req,res,next,200, user) : sendResponse(req,res,next,404, {}))
    .catch( err => {
        next(err);
    });
}

getCurrent = (req,res,next) => {
    userService.getById(req.user.sub)
        .then( user => user ? sendResponse(req,res,next,200,user) : sendResponse(req,res,next,404, {}))
        .catch( err => {
            next(err);
        });
}

update = (req,res,next) => {
    userService.update(req.params.id, req.body)
        .then( user => user ? sendResponse(req,res,next,200, user) : sendResponse(req,res,next,404, {}))
        .catch( err => {
            next(err);
        });
}

_delete = (req,res,next) => {
    userService.delete(req.params.id)
        .then( () => sendResponse(req,res,next,200, {}))
        .catch( err => {
            next(err);
        });
}



router.post('/authenticate', authenticateUser);
router.post('/signup', signup);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;