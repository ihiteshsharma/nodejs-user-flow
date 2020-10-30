const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const sendResponse = require('../_helpers/response.helper');

authenticateUser = (req, res, next) => {
    userService.authenticate(req.body)
    .then( user => user ? sendResponse(req, res, next, 200, user) : sendResponse(req, res, next, 400, "Incorrect username or password"))
    .catch( err => {
        sendResponse(req,res,next, 400, err)
    });
}

signup = (req, res, next) => {
    userService.createUser(req.body)
    .then(() => sendResponse(req,res,next,200, {}))
    .catch(err => sendResponse(req,res,next,400,err));
};

getById = (req,res,next) => {
    console.log("In getbyid route: NExt up params");
    console.log(req.params);
    userService.getById(req.params.id)
        .then( user => user ? sendResponse(req,res,next,200,user) : sendResponse(req,res,next,404,{}))
        .catch(err => sendResponse(req,res,next,400,err));

}

getAll = (req,res,next) => {
    console.log("In getall route");
    userService.getAll()
    .then( user => user ? sendResponse(req,res,next,200, user) : sendResponse(req,res,next,404, {}))
    .catch(err => sendResponse(req,res,next,400,err));

}

getCurrent = (req,res,next) => {
    userService.getById(req.user.sub)
        .then( user => user ? sendResponse(req,res,next,200,user) : sendResponse(req,res,next,404, {}))
        .catch(err => sendResponse(req,res,next,400,err));

}

update = (req,res,next) => {
    userService.update(req.params.id, req.body)
        .then( user => user ? sendResponse(req,res,next,200, user) : sendResponse(req,res,next,404, {}))
        .catch(err => sendResponse(req,res,next,400,err));
}

_delete = (req,res,next) => {
    userService.delete(req.params.id)
        .then( () => sendResponse(req,res,next,200, {}))
        .catch(err => sendResponse(req,res,next,400,err));

}



router.post('/authenticate', authenticateUser);
router.post('/signup', signup);
router.get('/getall', getAll);
router.get('/:id', getById);
router.get('/current', getCurrent);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;