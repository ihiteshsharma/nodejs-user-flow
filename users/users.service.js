const dbManager = require('../_helpers/db.config');
const logger = require('../_helpers/logger.helper');

//start the db
dbManager.start()
.then(function(){
    db = dbManager.db;
    logger("INFO", "MongoDB URI: " + dbManager.uri);
})
.catch((err) => {
    logger("ERR", err);
});;