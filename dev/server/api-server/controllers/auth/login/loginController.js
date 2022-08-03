import loginService from './loginService'
import bcrypt from 'bcrypt'
import { RefreshTokenModel, User } from '../../../models'
import { CustomErrorHandler, JwtService } from '../../../services'
import { REFRESH_SECRET } from '../../../config'

const loginController = {
    async login(req, res, next) {
        loginService.loginValidation(req, res, next)
        let access_token
        let refresh_token
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials("user not registered ! please register first !"))
            }
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials('wrong password !'))
            }
            access_token = JwtService.sign({ _id: user._id, email: user.email, role: user.role })
            refresh_token = JwtService.sign({ _id: user._id, email: user.email, role: user.role }, REFRESH_SECRET, '1y')
            await RefreshTokenModel.create({ token: refresh_token })

        } catch (err) {
            return next(err)
        }

        res.header(200).json({ access_token, refresh_token })
    },

    async logout(req, res, next) {
        loginService.logoutValidation(req, res, next)
        try {
            await RefreshTokenModel.deleteOne({ token: req.body.refresh_token })
        } catch (err) {
            return next(new Error("Internal Database Error"))
        }
        res.send({ status: 1 })
    }
}
export default loginController