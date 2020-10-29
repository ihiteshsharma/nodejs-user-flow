const dbManager = require('../_helpers/db.config');
const logger = require('../_helpers/logger.helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

var Users;

//start the db
dbManager.start()
.then(() => {
    dbManager.db.collection('users', (err, collection) => {
        if(err){
            logger("ERROR", err.message);
        }
        Users = collection;
        logger("INFO", "Using collection : Users" );
    });
    logger("INFO", "Connected to MongoDB with URI: " + dbManager.uri);
    console.log("DB Status: Connected")
})
.catch((err) => {
    logger("ERR", "Could not connect to database: " + err.message);
    console.log("DB Status: Error connecting");
});;

authenticate = async ({ username, password }) => {
    const user = await Users.findOne({ username });
    if(user && bcrypt.compareSync(password, user.hash)){
        const token = jwt.sign({ sub: user.id }, SECRET_KEY, { expiresIn: '3d' });
        return {
            ...user,
            token
        }
    }
}

getAll = async () => {
    return await Users.find();
}

getById = async (id) => {
    return await Users.findById(id).select('-_id -__v');
}

createUser = async (user) => {
    if(await Users.findOne({ username: user.username })){
        throw 'Username "' + user.username + '" exists';
    }
    
    if(user.password){
        user.hash = bcrypt.hashSync(user.password, 10);
    }

    Users.insertOne(user, (err, result) => {
        if(err) { throw err }
        logger("INFO", "New user created with username : " + user.username);
    });
}

module.exports = {
    getAll,
    getById,
    authenticate,
    createUser
}