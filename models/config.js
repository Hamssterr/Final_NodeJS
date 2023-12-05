const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME

let dbInstance = null

const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

module.exports.connect_db = async () => {
    await client.connect()
    dbInstance = client.db(DB_NAME)
    if(!dbInstance) throw new Error('Let connect to database server!')
    return dbInstance
}