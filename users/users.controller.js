const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const sendResponse = require('../_helpers/response.helper');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const PHOTOS_MAX_LIMIT = 5;

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


getByIdController = (req,res,next) => {
    userService.getById(req.params.id)
        .then( user => user ? sendResponse(req,res,next,200,user) : sendResponse(req,res,next,404,{}))
        .catch(err => sendResponse(req,res,next,400,err));

}

update = (req,res,next) => {
    userService.update(req.params.id, req.body)
        .then( () => sendResponse(req,res,next,200, {}))
        .catch(err => sendResponse(req,res,next,400,err));
}

_delete = (req,res,next) => {
    userService.delete(req.params.id)
        .then( () => sendResponse(req,res,next,200, {}))
        .catch(err => sendResponse(req,res,next,400,err));

}

getAll = (req,res,next) => {
    userService.getAll()
    .then( user => user ? sendResponse(req,res,next,200, user) : sendResponse(req,res,next,404, {}))
    .catch(err => sendResponse(req,res,next,400,err));

}

getCurrent = (req,res,next) => {
    userService.getById(req.user.sub)
        .then( user => user ? sendResponse(req,res,next,200,user) : sendResponse(req,res,next,404, {}))
        .catch(err => sendResponse(req,res,next,400,err));

}

uploadProfilePicture = (req,res,next) => {
    //get the profile picture
    let file = req.file;
    
    if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
        sendResponse(req,res,next,415, {"error": "Please select only jpeg or png files"})
    }
    
    //remove redundant fields; can be retained depending on use case
    delete file.fieldname;
    delete file.encoding;
    delete file.destination;

    userService.update(req.user.sub, { profilePicture: file })
        .then( () => sendResponse(req,res,next,200, {}))
        .catch(err => sendResponse(req,res,next,400,err));
}

uploadMultiplePictures = (req,res,next) => {
    let files = req.files
    files.map( file => {
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            sendResponse(req,res,next,415, {"error": "Please select only jpeg or png files"})
        }
        delete file.fieldname;
        delete file.encoding;
        delete file.destination;
    });

    userService.update(req.user.sub, { photos: files })
        .then( () => sendResponse(req,res,next,200, {}))
        .catch(err => sendResponse(req,res,next,400,err));
}

router.post('/profile/upload', upload.single('profile'), uploadProfilePicture);
router.post('/photos/upload', upload.array('photos', 5), uploadMultiplePictures);
router.post('/authenticate', authenticateUser);
router.post('/signup', signup);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getByIdController);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;