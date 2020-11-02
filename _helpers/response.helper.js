const logger = require('./logger.helper');

function sendResponse(req, res, next, status, data){
    switch(status){
        case 200:
            logger("INFO","Success request message : " + JSON.stringify(data));            
            return res.status(status).send({ message: 'Success', data: data });
        case 400:
            logger("ERR","Bad request 400 : " + JSON.stringify(data));            
            return res.status(status).send({ message: 'Bad Request', data: data });
        case 401:
            logger("ERR","Unauthorized Token 401 : " + JSON.stringify(data));            
            return res.status(status).send({ message: 'Unauthorized', data: {} });
        case 404:
            logger("ERR","Not found 404 : " + JSON.stringify(data));            
            return res.status(status).send({ message: 'Not found', data: 'Could not find requested resource'});
        default:
            break;
    }
    //default to 500
    return res.status(500).send({ message: 'Internal Server Error', data: 'An error occured'});
}


module.exports = sendResponse;