import bcrypt from 'bcrypt'
import { REFRESH_SECRET } from '../../../config'
const dbs = require('../../../db/dbConnection')
import { CustomErrorHandler, JwtService } from '../../../services'
import registrationService from "./registrationService"

const registerController = {
    async register(req, res, next) {
        let db
        registrationService.Validation(req, res, next)
        try {
            db = dbs.getDB()
            const exist = await db.collection('users').findOne({ email: req.body.email })
            console.log(exist)
            if (exist) {
                return next(CustomErrorHandler.alreadyExist("Email already exist."));
            }
        } catch (err) {
            return next(err)
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let access_token
        let refresh_token
        try {
            const result = await db.collection('users').insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            })
            let user;
            try {
                user = await db.collection('users').findOne({ _id: result })
            } catch (err) {

                return next(err)
            }
            access_token = JwtService.sign({ _id: result._id, role: result.role })
            refresh_token = JwtService.sign({ _id: result._id, role: result.role }, REFRESH_SECRET, '1y')
            await db.collection('refreshTokens').insertOne({ token: refresh_token })
        } catch (err) {
            console.log(err)
            return next(err)
        }
        res.header(200).json({ access_token, refresh_token })
    }
}

export default registerController