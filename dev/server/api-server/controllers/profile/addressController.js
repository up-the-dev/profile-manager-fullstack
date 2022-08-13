import { ObjectID } from "bson"
import { CustomErrorHandler } from "../../services"
const dbs = require('../../db/dbConnection')
let db
import { addressValidator } from "../../validators/address"
const addressController = {
    async update(req, res, next) {
        addressValidator(req, res, next)
        let document
        try {
            db = dbs.getDB()
            const user = await db.collection('users').findOne({ _id: new ObjectID(req.user._id) })
            if (!user) {
                return next(CustomErrorHandler.notFound())
            }
            document = await db.collection('users').updateOne({ _id: user._id }, {
                $push: {
                    addressInfo: req.body
                }
            })
        } catch (err) {
            return next(err)
        }
        res.status(201).json(document)
    },

    async getselfAddress(req, res, next) {
        let address
        try {
            db = dbs.getDB()
            address = await db.collection('users').findOne({ _id: new ObjectID(req.user._id) }, { projection: { addressInfo: 1, _id: 0 } });
            if (!address) {
                return next(CustomErrorHandler.notFound())
            }
        } catch (err) {
            return next(err)
        }
        res.send(address)
    },

    async getIdAddress(req, res, next) {
        let address
        try {
            db = dbs.getDB()
            address = await db.collection('users').findOne({ _id: new ObjectID(req.params.profileId) }, { projection: { _id: 0, addressInfo: 1 } })
            if (!address) {
                return next(CustomErrorHandler.notFound())
            }
        } catch (err) {
            return next(err)
        }
        res.send(address)
    }
}
export default addressController