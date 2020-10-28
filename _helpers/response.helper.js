function sendResponse(req, res, next, status, description){
    switch(status){
        case 200:
            return res.status(status).json({ message: 'Success', description: description });
        case 400:
            return res.status(status).json({ message: 'Bad Request', description: description });
        case 404:
            return res.status(status).json({ message: 'Not found', description: 'Could not find requested resource'});
        default:
            break;
    }
    //default to 500
    return res.status(500).json({ message: 'Internal Server Error', description: 'An error occured'});
}


module.exports = sendResponse;