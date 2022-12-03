const { MongoClient, ServerApiVersion } = require('mongodb')
const { DB_URL } = require("../config")
const client = new MongoClient(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
})
let dbConnection
module.exports = {
    connection: (next) => {
        try {
            client.connect((err, dbc) => {
                if (err || !dbc) {
                    return next(err)
                }
                dbConnection = dbc.db('profiles')
                console.log("DB CONNECTED")
                return next()
            })
        } catch (err) {
            throw err
        }
    },

    getDB: () => {
        return dbConnection
    }
}