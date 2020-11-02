### Basic User Authentication Flow in Nodejs

To use this repo, you will need following env variables:

##### SECRET_KEY : This is the key used to sign the jwt
##### SERVER_MODE : production or development
##### PORT : Server port to listen to
##### DATABASE_MODE : local or remote depending where you wanna connect to
##### DATABASE_URL : this can be the MongoDB Atlas Cluster URL
##### DATABASE_IP : In case you are using a hosted db server, use this field to set its static IP
##### DATABASE_PORT : Port db is running on
##### DATABASE_NAME : db to use
##### DATABASE_USER : Ensure this user has read and write privileges
##### DATABASE_PASSWORD