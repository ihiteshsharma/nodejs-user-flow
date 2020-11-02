const dbManager = require('../_helpers/db.config');
const logger = require('../_helpers/logger.helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

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
        const token = jwt.sign({ sub: user._id }, SECRET_KEY, { expiresIn: '3d' });
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }
    }
}

getAll = async () => {
    return await Users.find({}, { '_id': 0}).toArray();
}

getById = async (id) => {
    return await Users.findOne({ '_id': new ObjectID(id)});
}

createUser = async (user) => {
    if(await Users.findOne({ username: user.username })){
        throw 'Username "' + user.username + '" exists';
    }
    
    if(user.password){
        user.hash = bcrypt.hashSync(user.password, 10);
    }
    let userToStore = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        hash: user.hash
    }
    Users.insertOne(userToStore, (err, result) => {
        if(err) { throw err }
        logger("INFO", "New user created with username : " + user.username);
    });
}

update = async (id, updatedUser) => {
    let user = await Users.findOne({'_id': new ObjectID(id)});

    if(!user){ throw "User not found!"; }

    if(user.username !== updatedUser.username && await Users.findOne({ username: updatedUser.username })){
        throw 'Cannot update Username as its already taken';
    }

    if(updatedUser.password){
        updatedUser.hash = bcrypt.hashSync(updatedUser.password,10);
    }

    await Users.updateOne({ '_id': new ObjectID(id) }, updatedUser, (err, result) => {
        if(err) throw err
        console.log(result);
        logger("INFO", "Updated User with ID: " +id);
    });
}

_delete = async (id) => {
    await Users.deleteOne({ '_id': new ObjectID(id) }, (err, result) => {
        if(err) throw err
        if(result){
            console.log("User with ID: " + id +" deleted successfully");
            logger("INFO", "User with ID " + id + " deleted successfully");
        }
    })
}

module.exports = {
    getAll,
    getById,
    authenticate,
    createUser,
    update,
    delete: _delete
}