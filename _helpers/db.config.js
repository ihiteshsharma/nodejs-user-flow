//src/config/db.config.js

//defines a mongodbserver in memory ready for use

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const COLLECTIONS = ['users'];

class DBManager {
    constructor(){
        this.uri = null
        this.db = null;
        this.server = new MongoMemoryServer();
        this.connection = null;
    }
    async start(){
        const url = await this.server.getUri();
        this.uri = url;
        this.connection = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        this.db = this.connection.db(await this.server.getDbName());
    }
    stop(){
        this.connection.close();
        return this.server.stop();
    }

    cleanup(){
        return Promise.all(COLLECTIONS.map(collection => this.db.collection(collection).deleteMany({})));
    }

}


module.exports = new DBManager();