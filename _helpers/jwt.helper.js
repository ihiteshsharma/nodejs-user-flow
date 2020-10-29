const expressJWT = require('express-jwt');
const SECRET_KEY = process.env.SECRET_KEY;
const userService = require('../users/users.service');

function jwt(){
    const secret = SECRET_KEY;
    return expressJWT({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/users/authenticate',
            '/users/signup'
        ]
    });
}

async function isRevoked(req,payload,done){
    const user = await userService.getById(payload.sub);

    if(!user){
        return done(null, true);
    }
    done();
}

module.exports = jwt;