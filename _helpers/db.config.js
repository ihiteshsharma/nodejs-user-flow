//src/config/db.config.js

const { MongoClient } = require('mongodb');

// as we connect to MongoDB Atlas, ip and port have not been explicitly set
// if we use a separate db server, define variables in dotenv and import here
// uncomment the below two lines if connecting to a separate db server

const DBConfig = {
    db_mode: process.env.DATABASE_MODE,
    server_ip: process.env.DATABASE_IP,
    server_port: process.env.DATABASE_PORT,
    db_clusterURL: process.env.DATABASE_URL,
    db_name: process.env.DATABASE_NAME,
    db_username: process.env.DATABASE_USER,
    db_userpassword: process.env.DATABASE_PASSWORD
};


const uri = (DBConfig.db_mode === 'remote') ? "mongodb+srv://"+DBConfig.db_username+":"+DBConfig.db_userpassword+"@"+DBConfig.db_clusterURL+"/"+DBConfig.db_name+"?" : "mongodb://"+DBConfig.server_ip+":"+DBConfig.server_port+"/"+DBConfig.db_name+"?" ;

const COLLECTIONS = ['users']

class DBManager {
    constructor(){
        this.uri = uri;
        this.connection = null;
        this.db = null;
    }
    async start(){
        this.connection = await new MongoClient.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = this.connection.db(DBConfig.db_name);
    }
    stop(){
        this.connection.close();
    }
    cleanup(){
        return Promise.all(COLLECTIONS.map(collection => this.db.collection(collection).deleteMany({})));
    }
}


module.exports = new DBManager();