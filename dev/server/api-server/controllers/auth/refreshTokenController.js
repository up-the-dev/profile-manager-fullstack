import Joi from "joi"
import { REFRESH_SECRET } from "../../config"
import { RefreshTokenModel, User } from "../../models"
import { CustomErrorHandler, JwtService } from "../../services"

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
        try {
            const refreshToken = await RefreshTokenModel.findOne({ token: req.body.refresh_token })
            if (!refreshToken) {
                return next(CustomErrorHandler.unAuthorized("refresh token not found"))
            }
            let userId
            try {
                const { _id } = await JwtService.verify(refreshToken.token, REFRESH_SECRET)
                userId = _id

            } catch (err) {
                return next(CustomErrorHandler.unAuthorized('invalid refresh token'))
            }
            const user = await User.exists({ _id: userId })
            if (!user) {
                return next(CustomErrorHandler.notFound("user not found"))
            }
            access_token = await JwtService.sign({ _id: user._id, email: user.email, role: user.role })
            refresh_token = await JwtService.sign({ _id: user._id, email: user.email, role: user.role }, REFRESH_SECRET, '1y')
            await RefreshTokenModel.create({ token: refresh_token })
        } catch (err) {
            return next(err)
        }

        res.json({ access_token, refresh_token })
    }
}
export default refreshTokenController