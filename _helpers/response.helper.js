function sendResponse(req, res, next, status, data){
    switch(status){
        case 200:
            return res.status(status).send({ message: 'Success', data: data });
        case 400:
            return res.status(status).send({ message: 'Bad Request', data: data });
        case 401:
            return res.status(status).send({ message: 'Unauthorized', data: {} });
        case 404:
            return res.status(status).send({ message: 'Not found', data: 'Could not find requested resource'});
        default:
            break;
    }
    //default to 500
    return res.status(500).send({ message: 'Internal Server Error', data: 'An error occured'});
}


module.exports = sendResponse;