import Joi from "joi"
import { ObjectId } from "mongodb"
import { REFRESH_SECRET } from "../../config"
import { CustomErrorHandler, JwtService } from "../../services"
const dbs = require('../../db/dbConnection')
const refreshTokenController = {
    async refresh(req, res, next) {

        const tokenSchema = Joi.object({
            refresh_token: Joi.string().required()
        })
        const { error } = tokenSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        let access_token
        let refresh_token
        let db
        try {
            db = dbs.getDB()
            const refreshToken = await db.collection('refreshTokens').findOne({ token: req.body.refresh_token })
            if (!refreshToken) {
                return next(CustomErrorHandler.unAuthorized("refresh token not found"))
            }
            let userId
            try {
                const { _id } = await JwtService.verify(refreshToken.token, REFRESH_SECRET)
                userId = _id
                console.log(userId)
            } catch (err) {
                return next(CustomErrorHandler.unAuthorized('invalid refresh token'))
            }

            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) })
            if (!user) {
                return next(CustomErrorHandler.notFound("user not found"))
            }
            access_token = await JwtService.sign({ _id: user._id, role: user.role })
            refresh_token = await JwtService.sign({ _id: user._id, role: user.role }, REFRESH_SECRET, '1y')
            await db.collection('refreshTokens').insertOne({ token: refresh_token })
        } catch (err) {
            return next(err)
        }

        res.json({ access_token, refresh_token })
    }
}
export default refreshTokenController