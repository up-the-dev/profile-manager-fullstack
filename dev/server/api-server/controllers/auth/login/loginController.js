import loginService from './loginService'
import bcrypt from 'bcrypt'
import { User } from '../../../models'
import { CustomErrorHandler, JwtService } from '../../../services'

const loginController = {
    async login(req, res, next) {
        loginService.Validation(req, res, next)
        let access_token
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
        } catch (err) {
            return next(err)
        }

        res.header(200).json({ access_token })
    }
}
export default loginController