function sendResponse(req, res, next, status, data){
    switch(status){
        case 200:
            return res.status(status).json({ message: 'Success', data: data });
        case 400:
            return res.status(status).json({ message: 'Bad Request', data: data });
        case 401:
            return res.status(status).json({ message: 'Unauthorized', data: {} });
        case 404:
            return res.status(status).json({ message: 'Not found', data: 'Could not find requested resource'});
        default:
            break;
    }
    //default to 500
    return res.status(500).json({ message: 'Internal Server Error', data: 'An error occured'});
}


module.exports = sendResponse;