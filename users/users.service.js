const dbManager = require('../_helpers/db.config');
const logger = require('../_helpers/logger.helper');

//start the db
dbManager.start()
.then(function(){
    db = dbManager.db;
    logger("INFO", "Connected to MongoDB with URI: " + dbManager.uri);
    console.log("DB Status: Connected")
})
.catch((err) => {
    logger("ERR", "Could not connect to database: " + err.message);
    console.log("DB Status: Error connecting");

});;