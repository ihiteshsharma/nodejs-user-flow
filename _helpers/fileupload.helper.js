const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sendResponse = require('./response.helper');

uploadSingleFile = (req,res,next) => {
    //rename the original file and return the modified name
    console.log(req.file)
    sendResponse(req,res,next,200,req.file);
}

uploadMultipleFiles = (req,res,next) => {
    //rename the original file and return the modified name
    console.log(req.files)
    sendResponse(req,res,next,200,req.files);
}


router.post('/single/upload', upload.single('picture'), uploadSingleFile);
router.post('/multiple/upload', upload.array('pictures', 5), uploadSingleFile);


module.exports = router;
