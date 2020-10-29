const dbManager = require('../_helpers/db.config');
const logger = require('../_helpers/logger.helper');
var Users;

//start the db
dbManager.start()
.then(() => {
    dbManager.db.collection('Users', (err, collection) => {
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

}