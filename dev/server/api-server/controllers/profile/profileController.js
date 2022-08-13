const dbs = require('../../db/dbConnection')
import { ObjectID } from "bson"
import { CustomErrorHandler } from "../../services"
let db
const profileController = {
    async selfProfile(req, res, next) {
        let user
        try {
            db = dbs.getDB()
            user = await db.collection('users').findOne({ _id: new ObjectID(req.user._id) })
            if (!user) {
                return next(CustomErrorHandler.notFound())
            }
        } catch (err) {
            return next(err)
        }
        res.send(user)
    },
    async getIdProfile(req, res, next) {
        let user
        try {
            db = dbs.getDB()
            user = await db.collection('users').findOne({ _id: new ObjectID(req.params.profileId) }, { projection: { password: 0, _id: 0 } })
            if (!user) {
                return next(CustomErrorHandler.notFound())
            }
        } catch (err) {
            return next(err)
        }
        res.send(user)
    }
}
export default profileController