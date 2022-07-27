import Joi from "joi"
import bcrypt from 'bcrypt'
import { User } from "../../models"
import { CustomErrorHandler, JwtService } from '../../services'

const registerController = {
    async register(req, res, next) {

        const registerSchema = Joi.object({
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(1).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{8}$')).required(),
            repeat_password: Joi.ref('password')

        })
        const { error } = registerSchema.validate(req.body)
        if (error) {
            return next(error)
        }


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
        try {
            let result = await user.save();
            access_token = JwtService.sign({ name: result.name, email: result.email, role: result.role })
        } catch (err) {
            return next(err)
        }

        res.json({ access_token })
    }
}

export default registerController