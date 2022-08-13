import loginService from './loginService'
import bcrypt from 'bcrypt'
const dbs = require('../../../db/dbConnection')
import { CustomErrorHandler, JwtService } from '../../../services'
import { REFRESH_SECRET } from '../../../config'

let db
const loginController = {

    async login(req, res, next) {
        db = dbs.getDB()
        loginService.loginValidation(req, res, next)
        let access_token
        let refresh_token
        let user
        try {
            try {
                user = await db.collection('users').findOne({ email: req.body.email })
                if (!user) {
                    return next(CustomErrorHandler.wrongCredentials("user not registered ! please register first !"))
                }
            } catch (err) {
                return next(err)
            }

            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials('wrong password !'))
            }
            access_token = JwtService.sign({ _id: user._id, role: user.role })
            refresh_token = JwtService.sign({ _id: user._id, role: user.role }, REFRESH_SECRET, '1y')
            await db.collection('refreshTokens').insertOne({ token: refresh_token })

        } catch (err) {
            console.log(err)
            return next(err)
        }

        res.header(200).json({ access_token, refresh_token })
    },

    async logout(req, res, next) {
        db = dbs.getDB()
        loginService.logoutValidation(req, res, next)
        try {
            await db.collection('refreshTokens').deleteOne({ token: req.body.refresh_token })
        } catch (err) {
            return next(new Error("Internal Database Error"))
        }
        res.send({ status: 1 })
    }
}
export default loginController