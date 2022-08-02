import bcrypt from 'bcrypt'
import { REFRESH_SECRET } from '../../../config'
import { User, RefreshTokenModel } from "../../../models"
import { CustomErrorHandler, JwtService } from '../../../services'
import registrationService from "./registrationService"

const registerController = {
    async register(req, res, next) {
        registrationService.Validation(req, res, next)
        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorHandler.alreadyExist("Email already exist."));
            }
        } catch (err) {
            return next(err)
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })
        let access_token
        let refresh_token
        try {
            let result = await user.save();
            access_token = JwtService.sign({ _id: result._id, email: result.email, role: result.role })
            refresh_token = JwtService.sign({ _id: result._id, email: result.email, role: result.role }, REFRESH_SECRET, '1y')
            await RefreshTokenModel.create({ token: refresh_token })
        } catch (err) {
            return next(err)
        }
        res.header(200).json({ access_token, refresh_token })
    }
}

export default registerController